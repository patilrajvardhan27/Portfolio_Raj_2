import numpy as np, wave
SR=44100; DUR=20.0; N=int(SR*DUR)
BEAT=0.625; BAR=2.5
rng=np.random.default_rng(7)
L=np.zeros(N); R=np.zeros(N)
def add(buf_l, buf_r, t, sig, gain=1.0, pan=0.0):
    i=int(t*SR)
    if i>=N or i<0: return
    n=min(len(sig), N-i)
    gl=gain*np.cos((pan+1)*np.pi/4); gr=gain*np.sin((pan+1)*np.pi/4)
    buf_l[i:i+n]+=sig[:n]*gl; buf_r[i:i+n]+=sig[:n]*gr
def tt(d): return np.arange(int(d*SR))/SR
def midi(m): return 440*2**((m-69)/12)
def fftfilt(x, lo=None, hi=None, slope=0.5):
    X=np.fft.rfft(x); f=np.fft.rfftfreq(len(x),1/SR); g=np.ones_like(f)
    if lo: g*=1/(1+(lo/np.maximum(f,1e-6))**(2*slope*4))
    if hi: g*=1/(1+(f/hi)**(2*slope*4))
    return np.fft.irfft(X*g, len(x))
def env(d, a=0.005, r=0.05):
    t=tt(d); e=np.minimum(t/a,1)*np.minimum((d-t)/r,1); return np.clip(e,0,1)

# ---------- instruments
def epiano(m, d, vel=1.0):
    f=midi(m); t=tt(d+0.6)
    idx=2.2*np.exp(-t*6)+0.35
    s=np.sin(2*np.pi*f*t + idx*np.sin(2*np.pi*f*t)) + 0.25*np.sin(2*np.pi*2*f*t)*np.exp(-t*9)
    bell=0.12*np.sin(2*np.pi*f*7.02*t)*np.exp(-t*30)
    a=np.exp(-t*2.2)*np.minimum(t/0.004,1)
    rel=np.clip((d+0.6-t)/0.5,0,1)
    trem=1+0.08*np.sin(2*np.pi*4.5*t)
    return (s+bell)*a*rel*trem*vel
def bass(m, d, vel=1.0):
    f=midi(m); t=tt(d)
    s=np.sin(2*np.pi*f*t+0.6*np.sin(2*np.pi*f*t)*np.exp(-t*5))+0.2*np.sin(2*np.pi*2*f*t)
    return np.tanh(1.4*s)*env(d,0.008,0.07)*np.exp(-t*1.2)*vel
def kick(vel=1.0):
    t=tt(0.32); f=48+95*np.exp(-t*32)
    ph=2*np.pi*np.cumsum(f)/SR
    return np.tanh(1.6*np.sin(ph))*np.exp(-t*11)*vel
def snare(vel=1.0):
    t=tt(0.22); n=fftfilt(rng.standard_normal(len(t)),lo=900,hi=7000)
    tone=np.sin(2*np.pi*midi(57)*t)*np.exp(-t*28)   # A3, in key
    return (0.55*n*np.exp(-t*20)+0.5*tone)*vel
def hat(vel=1.0, d=0.05):
    t=tt(d); n=fftfilt(rng.standard_normal(len(t)),lo=6500)
    return n*np.exp(-t*(3.2/d))*vel
def pluck(m, d=0.9, vel=1.0):
    f=midi(m); t=tt(d)
    s=np.sin(2*np.pi*f*t)+0.4*np.sin(2*np.pi*2*f*t)*np.exp(-t*8)+0.15*np.sin(2*np.pi*3*f*t)*np.exp(-t*14)
    return s*np.exp(-t*4.5)*np.minimum(t/0.003,1)*vel
def lead(m, d, vel=1.0):
    f=midi(m); t=tt(d+0.25)
    vib=1+0.004*np.sin(2*np.pi*5.2*t)
    s=np.sin(2*np.pi*f*t*vib)+0.18*np.sin(2*np.pi*3*f*t)
    return s*np.minimum(t/0.02,1)*np.clip((d+0.25-t)/0.25,0,1)*np.exp(-t*1.4)*vel
def whoosh(d, lo, hi, up=True):
    t=tt(d); n=rng.standard_normal(len(t))
    p=t/d if up else 1-t/d
    out=np.zeros(len(t)); seg=2048
    # sweep a band-pass by blending three filtered copies
    a=fftfilt(n,lo=lo,hi=lo*3); b=fftfilt(n,lo=(lo*hi)**0.5,hi=(lo*hi)**0.5*3); c=fftfilt(n,lo=hi,hi=hi*3)
    out=a*np.clip(1-2*p,0,1)+b*(1-np.abs(2*p-1))+c*np.clip(2*p-1,0,1)
    return out*np.sin(np.pi*np.clip(t/d,0,1))**1.5
def tick(m=81, vel=1.0):
    t=tt(0.035); return np.sin(2*np.pi*midi(m)*t)*np.exp(-t*160)*vel

mus_l=np.zeros(N); mus_r=np.zeros(N); fx_l=np.zeros(N); fx_r=np.zeros(N)

# ---------- vinyl bed: crackle + rumble, whole piece
cr=np.zeros(N)
for _ in range(int(DUR*26)):
    i=rng.integers(0,N-200); a=rng.random()**3
    cr[i:i+60]+=a*rng.standard_normal(60)*np.exp(-np.arange(60)/9)
cr=fftfilt(cr,lo=1200,hi=9000)
hiss=fftfilt(rng.standard_normal(N),lo=2500,hi=9000)*0.012
t_all=np.arange(N)/SR
bed_gain=np.interp(t_all,[0,0.15,1.6,2.5,17.5,18.2,19.3,20],[0,1,1,0.45,0.45,0.8,0.8,0])
add(mus_l,mus_r,0,(cr*0.5+hiss)*bed_gain,1.0,-0.1)
add(mus_l,mus_r,0,np.roll(cr,3111)*0.35*bed_gain,1.0,0.3)

# ---------- intro (0-2.5): low D drone swelling, needle thump at 1.6, pickup into the downbeat
t=tt(2.6)
drone=(np.sin(2*np.pi*midi(38)*t)+0.5*np.sin(2*np.pi*midi(50)*t)+0.25*np.sin(2*np.pi*midi(57)*t+0.3*np.sin(2*np.pi*0.7*t)))
drone*=np.interp(t,[0,0.3,1.6,2.45,2.6],[0,0.25,0.6,1.0,0])
add(mus_l,mus_r,0,drone,0.16)
# needle drop: soft thud tuned to D + a little crackle burst
t=tt(0.4); thud=np.sin(2*np.pi*(midi(38)+40*np.exp(-t*40))*t)*np.exp(-t*14)
burst=fftfilt(rng.standard_normal(len(t)),lo=1500,hi=6000)*np.exp(-t*30)
add(fx_l,fx_r,1.6,thud,0.55); add(fx_l,fx_r,1.6,burst,0.12,0.2)
# pickup: rising swell + three pickup notes A-C-D on the last beat
sw=whoosh(0.9,400,3500,True); add(fx_l,fx_r,1.62,sw,0.10)
for k,(m) in enumerate([57,60,62]):
    add(mus_l,mus_r,2.5-BEAT+k*BEAT/4+ (BEAT/4), epiano(m+12,0.12,0.5),0.22,0.15)

# ---------- groove
CH={ "Dm9":[50,57,60,64,65], "Bbmaj7":[46,53,57,62,65], "Gm9":[43,50,58,62,65], "A7":[45,52,55,61,64] }
ROOT={"Dm9":38,"Bbmaj7":34,"Gm9":31,"A7":33}
bars=[(2.5,"Dm9","full"),(5.0,"Bbmaj7","full"),(7.5,"Gm9","full"),(10.0,"A7","full"),(12.5,"Dm9","light"),(15.0,"Bbmaj7","light")]
SW=0.58
def e8(b0, k):  # time of 8th-note k (0..7) with swing
    beat=k//2; return b0+beat*BEAT+(SW*BEAT if k%2 else 0)
MEL={2.5:[(0,69,1.0),(3,72,0.5),(4,74,1.2)], 5.0:[(0,77,0.9),(2,74,0.5),(5,72,1.0)],
     7.5:[(1,74,0.5),(3,77,0.5),(4,79,1.2)], 10.0:[(0,81,0.8),(3,79,0.4),(4,76,0.6),(6,73,0.7)],
     12.5:[(0,74,1.6)], 15.0:[(4,69,0.5),(6,72,0.5)]}
for b0,ch,mode in bars:
    notes=CH[ch]
    # chords: beat 1 held, and-of-2 stab
    for j,m in enumerate(notes):
        add(mus_l,mus_r,b0+j*0.008,epiano(m,1.4,0.9),0.10,(-0.5+j*0.25))
        add(mus_l,mus_r,e8(b0,3)+j*0.006,epiano(m,0.35,0.7),0.07,(0.5-j*0.25))
        if mode=="full": add(mus_l,mus_r,e8(b0,6)+j*0.006,epiano(m,0.3,0.55),0.055,(-0.3+j*0.15))
    for j,m in enumerate(notes[1:]):
        tp=tt(BAR+0.3); pd=(np.sin(2*np.pi*midi(m+12)*tp)+0.5*np.sin(2*np.pi*midi(m)*tp+0.4*np.sin(2*np.pi*0.5*tp)))
        pd*=np.minimum(tp/0.35,1)*np.clip((BAR+0.3-tp)/0.3,0,1)
        add(mus_l,mus_r,b0,pd,0.03,(-0.7+j*0.45))
    r=ROOT[ch]+12
    add(mus_l,mus_r,b0,bass(r,0.7),0.34)
    add(mus_l,mus_r,e8(b0,3),bass(r,0.25,0.8),0.28)
    add(mus_l,mus_r,e8(b0,4),bass(r+7 if ch!="A7" else r+7,0.4,0.9),0.28)
    add(mus_l,mus_r,e8(b0,7),bass(r+12,0.2,0.7),0.24)
    kicks=[0,3,4] if mode=="full" else [0,4]
    for k in kicks: add(mus_l,mus_r,e8(b0,k),kick(1.0 if k==0 else 0.8),0.5 if mode=="full" else 0.36)
    for k in [2,6]: add(mus_l,mus_r,e8(b0,k),snare(),0.26 if mode=="full" else 0.15,0.05)
    for k in range(8):
        add(mus_l,mus_r,e8(b0,k)+rng.normal(0,0.003),hat(0.6 if k%2 else 1.0),0.075 if mode=="full" else 0.05,0.35)
    for k,m,d in MEL[b0]:
        add(mus_l,mus_r,e8(b0,k),lead(m,d*BEAT),0.075,-0.2)

# ---------- final chord at 17.5, rings out
for j,m in enumerate([38,50,57,62,65,69,76]):
    add(mus_l,mus_r,17.5+j*0.012,epiano(m,2.2,1.0),0.11,(-0.6+j*0.2))
add(mus_l,mus_r,17.5,bass(38,1.6),0.36); add(mus_l,mus_r,17.5,kick(),0.5)
add(mus_l,mus_r,17.5,pluck(86,1.6,1.0),0.05,0.3)

# ---------- effects, tuned to D minor and tucked under the music
add(fx_l,fx_r,2.5,whoosh(1.1,300,2500,True),0.07,0.0)               # reveal opens
for k,(ts,m) in enumerate(zip([7.5,9.375,11.25],[74,77,81])):        # stat cards: D5, F5, A5
    add(fx_l,fx_r,ts,pluck(m,1.0),0.16,0.35); add(fx_l,fx_r,ts,pluck(m+12,0.6),0.05,0.35)
    add(fx_l,fx_r,ts-0.16,whoosh(0.3,600,4000,True),0.055,0.3)
for ts,pan in [(7.38,0.3),(12.95,0.6),(14.7,0.6)]:                   # clicks
    add(fx_l,fx_r,ts,tick(69,1.0),0.10,pan); add(fx_l,fx_r,ts,tick(81,0.6),0.05,pan)
for i in range(17):                                                  # typing, very soft
    add(fx_l,fx_r,13.55+i*0.052,tick(86+int(rng.integers(0,3))*2,1.0),0.028,0.25+rng.normal(0,0.05))
add(fx_l,fx_r,14.72,pluck(86,0.3),0.06,0.5); add(fx_l,fx_r,14.80,pluck(93,0.4),0.05,0.5)   # send: D6 -> A6
add(fx_l,fx_r,15.25,pluck(81,0.5),0.04,0.4)                          # answer arrives
add(fx_l,fx_r,17.35,whoosh(0.8,250,2200,False),0.08,0.2)             # red closes in

# ---------- mix
ml=fftfilt(mus_l,hi=9500)+fx_l; mr=fftfilt(mus_r,hi=9500)+fx_r
# small room: two short feedback-free echoes for glue
def room(x):
    y=x.copy()
    for d,g in [(0.031,0.18),(0.047,0.13),(0.083,0.09),(0.127,0.06)]:
        k=int(d*SR); y[k:]+=x[:-k]*g
    return y
ml=room(ml); mr=room(mr[::1])
st=np.stack([ml,mr],1)
st=np.tanh(st*1.5)/np.tanh(1.5)
st/=np.max(np.abs(st))/0.89
fade=np.interp(t_all,[0,0.03,19.5,20.0],[0,1,1,0])
st*=fade[:,None]
w=wave.open("music.wav","wb"); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((st*32767).astype(np.int16).tobytes()); w.close()
print("peak",np.max(np.abs(st)),"rms",np.sqrt(np.mean(st**2)))

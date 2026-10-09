#!/bin/sh
# usage: sheet.sh out.png t1 t2 ...   (2 columns)
out=$1; shift
ins=""; n=0
for t in "$@"; do ins="$ins -i stills/$t.png"; n=$((n+1)); done
rows=$(( (n+1)/2 ))
ffmpeg -v error -y $ins -filter_complex "concat=n=$n:v=1:a=0,tile=2x$rows:padding=6:color=white" -frames:v 1 "$out"

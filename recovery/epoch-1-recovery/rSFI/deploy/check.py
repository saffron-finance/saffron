#!/usr/bin/python3
import csv, sys
with open(sys.argv[1], newline='') as csvfile:
    reader = csv.reader(csvfile)
    sum = 0
    for row in reader:
        sum = sum + int(row[1])
    print(sum)

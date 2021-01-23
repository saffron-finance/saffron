import sys
import json
import csv

if len(sys.argv) != 3:
    print("Usage: jsonToCsv.py [input file] [output file]")
    sys.exit(1)


inFile = sys.argv[1]
outFile = sys.argv[2]

with open(inFile) as json_file:
    data = json.load(json_file)

rsfi_data = data

# now we will open a file for writing
data_file = open(outFile, 'w')

# create the csv writer object
csv_writer = csv.writer(data_file)

# Counter variable used for writing
# headers to the CSV file
count = 0

for sendRsfi in rsfi_data:
    if count == 0:
        # Writing headers of CSV file
        header = sendRsfi.keys()
        csv_writer.writerow(header)
        count += 1

    # Writing data of CSV file
    csv_writer.writerow(sendRsfi.values())

data_file.close()

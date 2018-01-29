import csv
import json
import sys

def main():
    csv.field_size_limit(sys.maxsize)
    with open("cities_canada-usa.tsv", "r") as tsvfile:
        reader = csv.DictReader(tsvfile, delimiter='\t')
        cities = []
        for line in reader:
            name = line['name'] + ', '+ line['country']
            city = { 'name': name, 'latitude': line['lat'], 'longitude': line['long'] }
            cities.append(city)
    
    with open("data.json", "w") as file:
        file.write(json.dumps(cities))

if __name__ == "__main__":
    main()
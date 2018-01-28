import csv
import json

def main():
    with open("cities_canada-usa.tsv", "r") as tsvfile:
        reader = csv.DictReader(tsvfile, delimiter='\t')
        cities = []
        for line in reader:
            city = { 'name': ['name'], 'latitude': line['lat'], 'longitude': line['long'] }
            cities.append(city)

if __name__ == "__main__":
    main()
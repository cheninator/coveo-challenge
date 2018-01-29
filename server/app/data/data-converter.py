'''
 * Copyright (C) 2018 Yonni Chen
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
'''

import csv
import json
import sys

'''
 * From the TSV file containing the cities information, this python script
 * extracts relevant informations : name, country, latitude and longitude and
 * and exports a json file that could be upload to a MongoDB data base
'''

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
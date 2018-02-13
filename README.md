# OutpatientAPI
API endpoints using Yelp API to get json data of Physical Therapists by location

### Prerequisites

* [Node.js](https://nodejs.org/en/)

### Set Up

In Terminal:
* clone project
```
git clone https://github.com/georgehsin/OutpatientAPI
```

* go into project folder
```
cd OutpatientAPI
```

* install dependencies
```
npm install
```

### Running

In Terminal:
* run server
```
node server.js
```

* To get summary of results based on location:

In web broswer address bar:
```
http://localhost:8000/physicalTherapists/{location}
```

* To get list of PTs based on location that have ratings, ordered in descending order of star
ratings.
```
http://localhost:8000/physicalTherapists/{location}/sorted-rating
```

For {location}:
From Yelp: "Specifies the combination of 'address, neighborhood, city, state or zip, optional country' to be used when searching for businesses."
Easiest way is to just type in the city:
```
http://localhost:8000/physicalTherapists/sanfrancisco
```
Can be more specific with city and state or zipcode - San Francisco, CA
```
http://localhost:8000/physicalTherapists/sanfranciscoca
```

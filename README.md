# clique-tutorial
A simple tutorial to get you started with Clique

## Building the Tutorial Application

**Clone the repository.**  You will need to clone this repository to start:
````
git clone https://github.com/Kitware/clique-tutorial
cd clique-tutorial
````

**Get the data.** Download [this
   file](http://romanesco.readthedocs.org/en/latest/\_static/facebook-sample-data.txt),
containing a sample Facebook network.

**Install the front-end dependencies.** Run the following command:

````
bower install webcola 'clique#ea88e5a2c7854adeae26a6c13a5a52755177c434'
````
(The quotes are needed in order to escape the hash symbol.)

**Serve the application directory.** Run the following command:

````
python -m SimpleHTTPServer 8000
````

**Try the application.** Open http://localhost:8000 in your browser.

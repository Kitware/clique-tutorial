# clique-tutorial
A simple tutorial to get you started with Clique

## Building the Tutorial Application

1. **Get the data.** Download [this
   file](http://romanesco.readthedocs.org/en/latest/\_static/facebook-sample-data.txt),
containing a sample Facebook network.

2. **Install the front-end dependencies.** Run the following command:

    bower install webcola 'clique#ea88e5a2c7854adeae26a6c13a5a52755177c434'

(The quotes are needed in order to escape the hash symbol.)

3. **Serve the application directory.** Run the following command:

    python -m SimpleHTTPServer 8000

4. **Try the application.** Open http://localhost:8000 in your browser.

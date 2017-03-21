# Making requests from the back end

## There's options...

* HTTP (node core module)
  * You can do API calls with the HTTP core module with the syntax

  ```
     http.get(url, (response) => {

       let data = '';
       response.on('data', (chunk) => {
         data += chunk;
       });
       response.on('end', () => {
         doSomeStuffWith(data);
       });

     });
     ```
     This requires using a stream which isn't usually necessary. Most of the time you're probably going to just be wanting to get the final product of the api call without worrying about the way the data is coming through in chunks.
* We found a comparison of different NPM modules on npmcompare.com, here's a screencap of the comparison:
![](/img/comparison.png)
  * from this we can see that the Request module is clearly the most widely used module, with almost five times as many daily downloads as the next most used module, Got.
  * With this in mind we have written a small app, the process of which is:
    * I go to the landing page, which queries our back end, which then serves our index.html
    * on load of the index.html we make an XHR to our back end with the url "/random-image"
    * this goes through our server which then calls a random word API, using the request module we call the API, then in the callback to the request function we pass the word we get into the querystring url for the giphy API
    * We make a call to the giphy API using the request module, then in the callback to this request call we serve the response (a gif) to the front end
    * et voila!
    
## Learnings
We tried to write the requests to both APIs both with the HTTP core module and with the NPM request module, we found that not only was the Request module easier to use (rather than using the streams you can just plug in a url and a callback that does some stuff with the result), it was also more consistent.<br>The one we wrote ourselves with HTTP requests was much more prone to problems (we spent a decent amount of time debugging the core module logic), where the Request module was much more straightforward.

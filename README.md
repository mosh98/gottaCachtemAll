# Pokemon Trainer

**What is Pokemon Trainer?**
* A website where the user can browse pokemons, the pokemons' skills, and collect them. 

**What technologies were used?**
* The project was created using TypeScript, Angular, HTML, and TailwindCSS. Tailwind was deemed especially appropriate for this project as Angular separates each component into three separate files: TypeScript, HTML, and CSS. The use of TailwindCSS allows us to write inline CSS, which means we could remove a majority of the individual component CSS files altogether. 
	
**What challenges were faced?**
* The biggest challenge faced was using Angular. Neither of us were familiar with Angular previously to working with it in this project. However, over the duration of the project we got more and more used to the flow of working with Angular. 

**Feature breakdown** 
* Login Page
Simple page where the user can login or register by entering their username
	- Login: Logs in or registers the username input based on whether the username exists in the API already or not. Upon login the user object is fetched from the API, assuming the user already existed, and the user data is saved in localStorage. 
  ![image](https://user-images.githubusercontent.com/82815800/216978664-2a2fe48e-2c1a-49c7-8cc8-d58fd69d1087.png)
  
* Catalogue page
Page which displays some pokemons and allows the user to catch them, as well as showing more info regarding their abilities.  
	- Catch: Allows for the user to catch a pokemon. Button is replaced with a pokeball if the pokemon is captured. 
  ![image](https://user-images.githubusercontent.com/82815800/216979371-e6ee8bd2-c7cf-4e2e-af9c-59427b3c0db5.png)

  - Show info: Shows info regarding any given pokemon by fetching the info from the PokeAPI. 
		![image](https://user-images.githubusercontent.com/82815800/216979612-000a3db1-23d5-421c-861c-46615ec177cb.png)
    
  - Trainer page: Takes the user to the trainer page. 
  - Logout: Deletes the user data from the localStorage and sends the user to the login page. 

* Trainer page
Shows the pokemons that the user has captured and allows the user to release them. 
  - Remove: Removes the pokemon in question from the localStorage, and the user's object in the API. 
  ![image](https://user-images.githubusercontent.com/82815800/216980509-ef019e79-9f6c-4701-a773-277a7b29d9df.png)


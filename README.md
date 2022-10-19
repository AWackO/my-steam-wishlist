# Steam Wishlist Browser and Search Project

The app pulls data from my personal steam wishlist and displays it. Every game card has the name of the game visible and number of reviews. Hovering on the card will also display the release date of the game at the top of the card.

You can search through the games with a search bar on top by clicking the magnifying glass button or by clicking the enter key on your keyboard. To show all games again, just search again whilst the search bar is empty.

Any of the games can be added to "currently playing" list (its something like an "add to favorites" function) by clicking the button with a game controller icon. Clicking the icon will add the game to the list and display it on the top of the website. The list is stored in local memory so upon refreshing the webpage or exiting out of the page the contents will not be lost. Clicking the same button on the game card at the top of the screen will remove the game from the currently playing list.

There are filters on the side which can sort the displayed game list or searched game list. It can be filtered by: date added, most reviews, least reviews, release date newest(sorted by most recently released games), release date older (sorted by the oldest games).

# Fetching of the data is through a webpage https://store.steampowered.com/wishlist/id/AWackO//wishlistdata?p={enter the number of a page here}

Since Steam does not have any wishlist features on its API i had to go through the page and parse the JSON data.

# Due to CORS Policies the line below had to be added in "package.json" file for it to fetch data properly. "AWackO" in the string is my personal account and can be replaced by any username that has a public steam profile.

"proxy": "https://store.steampowered.com/wishlist/id/AWackO/"

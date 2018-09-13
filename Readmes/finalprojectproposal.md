  # Hapnen

###### Includes SOME Icebox/Future Development Features

## Project "Story" (MVP)
#### (An overview of the intended application and WHY you feel it’s valuable) </br>
Happnen is an event platform for big and small scale events alike (separate in future development). 

- Once I create my account, I can see a map with events near me
  - Next to the map, is the list that I see with events
    * Future Dev: Hover over pins to see highlighted item on the list
    * Future Dev: Color coded pins for private, public, etc options
    * Future Dev: Image-coded pins (graphically custom pins)
  - I click on an event from the list, and I am taken to a page (page is rendered w/ react) showing me the event details:
    * Name
    * Time/Date 
    * Location 
      - Hidden if the event creator chose this
    * Description
    * My QR code section (if creator chooses this to be an option)
    * Future Dev: Request invite if it is a yellow event (public/invite only)
      - Creator views my profile to judge me worthy, or not.

- Then, I click on the menu option to go to my profile

- Once I am there, there is a "Create Event" Button
  * Basic (MVP) model:
    - User inputs all of the essential event information
    - Make event public, public/nonuser, public/invite only, or private
    - When it comes to location, they can choose whether or not they want to encrypt the location
      * This functionality is one of our unique ideas, and will ideally be very useful for small, private meetups of friends
      * It runs in conjunction with the private event option
      * FUNCTIONALITY
        - When creator creates event, app encrypts location and stores it in location collection
          * Each document has an id property and a encrypted location property
        - Creator specifies a set period of time after which the encrypted item (that document) is deleted from the database permanently
        - When user receives the invitation, and opened for the first time
          * Encrypted location is sent to user from db (which expires after a set period of time determined by the user,at which point it is erased from our db)
          * Key sent to front end temporarily to decrypt the location
          * Location rendered as a pin (coordinates) stored in a vcard file, named semantically to make it easy to find in the user's contacts
            - Vcard rendered on our end by some technology, maybe we have to build? Hopefully not
            - Expires after the user closes the page
            - Adds a message to the div where location vcard file was rendered to indicate it has expired 
            - Does not cache actual location (probably have to use specific technology for this in rendering process)
        - When user opens event 2nd time: 
          * Display the "location already accessed" message
        
  

    - Also decide whether to generate a QR code for each user that we invite 
    - Type in Username to add guests for private/invite only events
      * If added, append their name to the guests section in a bubble (maybe)
      * Adds their user id to the event's document guest property 
    - Push the create button
    - Creates the event page displaying all event info
    - If I am a proposed guest, the invitation shows up in the invitation section of my profile page
      * Invitations are stored in their own collection, each document having an id. The id's of each invitation that "belong" to a person are stored in the individual user documents under a "invitations" property
      * The invitations are populated by executing a populate function when the invitations page is loaded
  * Future Development Model (summary with additional ideas):
    - Big Events: All above functionality
    - Small Events: 
      * A more intimate UI where you can see, on one screen, which users have joined the event
      * Maybe get rid of QR code functionality


- Future Dev: Social Features (& ideas)
  * Incoorporate a friend system
    - Makes inviting people one step easier
  * See a grid of people's faces who are hosting events nearby, and see things like their : 
    - History
    - Reputation
    - Taste
  * Probably stay away from things like Facebook until very ADVANCED stages of development

## Design Layouts
  ### Front Page
  ![Front Page](https://i.imgur.com/AmQOrQVr.jpg)
  - Use modals with login

  ### Events Page
  ![Events](https://i.imgur.com/Aj5kHVd.jpg)

  ### Profile
  ![Events](https://i.imgur.com/aV9TAg9.jpg)

  ### Event Creation 
  ![Events](https://i.imgur.com/3PG8S7x.jpg)

  ### Event Page
  ![Events](https://i.imgur.com/3PG8S7x.jpg)

  

  ### Invitations Page
  #### Coming Soon!


## Group Members And Roles
- A breakdown of general pieces of functionality:
  * Project Management: Patrick
  * User/Login Base Functionality (w/ tokens): Wyatt, Jack
  * Map and Results: Wyatt, Kyle
  * Event Page: Patrick 
  * User/Location Encryption/QR code Generation based functionality: Jack, Kyle
    - Use json tokens
  * Vcard rendering service (probably): Aaron
  * Invitation Page: Patrick
  * Icebox-Social: Aaron, Wyatt
</br>

## Goal Marks

#### 08/27/2018:
MVP done

#### 09/03/2018
- Social Features integrated
- Event creation divided into big & small

## Trello
Link: 
https://trello.com/b/pk9TEWmM/mvp-stage


## Additional Icebox Ideas
- Age Verification for alcohol/21+ events </br>
- Venmo functionality
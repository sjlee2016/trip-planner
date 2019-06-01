# Trip Planner
## Purpose
the main goal of this project is to create a platform that makes creating plans for trips easiler and more enjoyable for everyone.

A trip with a group of people can be sometimes very stressful, because people want different things. Some people might want to go see the beautiful scenery of near beaches while some may want to go visit local night markets. Even worse,some may not even know exactly what they want to see in a foreign place. In order to make this process easier, the platform implements recommendation system, ranking system(through likes). 

## Solution
This website will be built as a SPA, with different services
- User Information Services : users can display their status, profile picture and etc 
- Friend services
: users can send and accept friend requests.  
- Group management : users can create a group by inviting their friends. The group will share the same calendar. The group will include one admin user. 
- Trip Planner Service :  Uses trip-advisor APIs to make suggestions based on where the group wants to travel. Users can create new plans for the trip. 
Data structure for a plan for trip to Seoul, Korea
  ```
  plan { 
  "user" : "sjlee2016",     
  "date" : "2019-4-19",
  "start-time" : "16:00",
  "end-time": "18:00",
  "location" : "gyeongbokgung",
  "details" : "let's see the beautiful palace in korea",
  "likes" : 3,
  "dislikes" : 0
  } 
  ``` 
  and if the new plan receive majority of dislikes(anonymous), it will be removed from the group calendar. If two plans were suggested within the same time frame, the plan with more likes will be displayed in the calendar.     

## Implementation
Frontend - React & Redux

Backend - NodeJS, MongoDB 

### User System   ( ~ will be implemented 4/19 )

- [x] Local Authentication
- [x] Google Authentication 
- [x] Login, Register
- [ ] Delete Account
- [x] Make, Edit Profile 
- [ ] Upload User photo 

### Friend System   ( ~ will be implemented 5/1 ) 

- [x] Sending Friend Request
- [x] Accepting Friend Request
- [x] Denying Friend Request

### Group Management System   ( ~ will be implemented 5/15)

- [x] Creating a group 
- [x] Leaving a group
- [x] Deleting a group
- [x] Inviting users to a group 
- [x] making a user as an admin


### Plan management System   ( ~ will be implemented 6/1 )
- [ ] Create a plan
- [ ] likes / dislikes a plan
- [ ] Delete a plan
- [ ] Display plans in the group calandar 


### Recommendation System   ( ~ will be implemented 6/15 )

- [ ] Use open source API to make recommendations of where users should travel 


### Admin Portal ( ~ will be implemented 7/1 ) 
- [ ] Manage users, groups 
- [ ] Data analysis 
- [ ] Q/A ? 


### Features that could be implented in the future 
```
make groups private / public.
private groups where only friends you invite can join.
public groups will allows strangers to send requests to join your group.
``` 

### Developer
- Se Jin Lee 

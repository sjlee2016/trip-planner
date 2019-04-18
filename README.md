# Trip Planner
## Purpose
the main goal of this project is to create a platform that makes creating plans for trips easiler and more enjoyable for everyone.

A trip with a group of people can be sometimes very stressful, because people want different things. Some people might want to go see the beautiful scenery of near beaches while some may want to go visit local night markets. Even worse,some may not even know exactly what they want to see in a foreign place. In order to make this process easier, the platform implements recommendation system, ranking system(through likes). 

## Solution
This system will multiple pages, with different services
- User Information Services : users can display their status, profile picture and etc 
- Friend services
: users can send and accept friend requests.  
- Group management : users can create a group by inviting their friends. The group will share the same calendar. The group will include one admin user. 
- Trip Planner Service :  Uses trip-advisor APIs to make suggestions based on where the group wants to travel. Users can create new plans for the trip. 
  ```
  Example of a plan for trip to Seoul, Korea stored in database
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

### Authentication   ( ~ will be implemented 4/19 )
```
- Local Authentication
- Google Authentication 
```


### Friend System   ( ~ will be implemented 5/1 )
```
- Sending Friend Request
- Accepting or Denying Friend Request
```


### Group Management System   ( ~ will be implemented 5/1 )
```
- Creating group , Deleting a group 
- Inviting friends to a group
- Accepting invitation 
```


### Plan management System   ( ~ will be implemented 6/1 )
```
- Create plans
- likes / dislikes 
- displaying plans in the group calendar 
```



### Recommendation System   ( ~ will be implemented 6/15 )
```
- Use opensource APIs to make recommendations 
(maybe trip advisor or skyscanner?) 
```

### Developer
- Se Jin Lee 

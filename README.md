# App

HealthPass Style App

# FR - Functional Requirements

- Users should be able to register.
- Users should be able to authenticate.
- It should be possible to retrieve the data of a logged-in user (GET).
- It should be possible to get the number of check-ins made by the logged-in user.
- Users should be able to search for nearby gyms.
- Users should be able to search gyms by name.
- Users should be able to check in at gyms.
- It should be possible to validate a user's check-in.
- It should be possible to register a gym.

# BR - Business Rules

- Users cannot register with a duplicate email.
- Users cannot perform two check-ins on the same day.
- Users cannot check in if they are not within 100 meters of the gym.
- Check-ins can only be validated up to 20 minutes after creation.
- Only administrators can validate check-ins.
- Only administrators can register a gym.

# NFR - Non-Functional Requirements

- User passwords must be encrypted.
- Data must be persisted in a PostgreSQL database.
- All data lists must be paginated, with 20 items per page.
- Users must be identified by a JWT (JSON Web Token).

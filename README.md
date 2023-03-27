# README

### Testing the app:

0. Run `bundle install`, `rails db:migrate` and `rails db:seed`

1. navigate inside the rails repo and run `rails s -p 3000`

2. navigate inside the `frontend` repo and run `npm run start`, and confirm running on a different port (usually port `3001`)

### Basic Signup Rules

1. Username may only contain letters, numbers, underscores, and hyphens
2. First name and last name may not contain numbers or spaces
3. You must be 18 years or older to register
4. You must pick a selection for gender
5. Password must contain at least 8 characters, and must contain at least one digit, one lower case letter, and one upper case letter
6. Password confirm must match


### Basic workflow

1. Navigate to `See Offers` page (you must be authenticated to see Offers)
2. Only offers that are eligible for you will be present
3. Click on a `Claim` button to claim the offer. Offers may only be claimed once, once you've claimed all the offers on the page, you'll need to reseed the database.

Sessions shall persist between page reloads and new browser windows. Logging out will destroy the session.

### CAVEATS!
The frontend makes a duplicate API call for each request. Forums online say that this is only a problem in development.

This may be related to double API calls (although, probably not), sometimes requests to `/offers` will be dropped because the backend claims there are no eligible Offers for the current user. This may be related to the backend redirecting  `/offers` to `/login` to ensure the user is logged in. I've not had enough time to get to the root cause of this issue. But if you reload the page 2-3 times (maybe CTRL-SHIFT-R), the records should load up correctly.

I did not complete the spec bonus objective.
# you should have a postgres is running and set up the .env file
run 'npm i' In the parent folder and then migrate to backend : 
cd backend then make : 
npx prisma db push
#Then you should back to the parent directory
then run "npm run dev"

#then navigate to frontend directory
    run    " npm i "
then run      "npm run dev"

#make the .env file just like :  DATABASE_URL="postgresql://postgres:passwordlocalhost:5432/rental"
, JWT_SECRET="your jwt secret"
, NODE_ENV="development"
,PORT=5000

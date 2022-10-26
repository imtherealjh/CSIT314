const app = require('./app')
const PORT = 8000

app.listen(PORT, (error) => {
    if(error) return console.log(`Error occured! : ${error}`);
    console.log(`Server successfully ran on port ${PORT}!!`);    
});
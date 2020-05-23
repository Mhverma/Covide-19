
import bg from './../img/bg.jpg'

const reportStyle = {

  main: {
    maxWidth: '1200px',
    margin: "0 auto",
    marginTop: 100
  },

  stats: {
    width: "100%",
   // alignItems:"center",
    backgroundImage: `linear-gradient(rgba(0,0,0,0.9), rgba(0,0,0,0.9)),url(${bg})`,
   // backgroundSize: "cover",
   
  },

  latestResport: {
    display: "flex",
    justifyContent: "space-between",
    margin: "0 auto",
    paddingTop: 10,
    color: "black",
    alignItems:"center",
  },


  totalCasesValue: {
    fontSize: "2em",
    fontWeight: "bold"
  },

  recoveredCasesValue: {
    fontSize: "2em",
    fontWeight: "bold",
    color: "#009688"
  },

  deathCasesValue:{
    fontSize: "2em",
    fontWeight: "bold",
    color: "#f44336",
},

searchBox:{
  positon:"relative",
 display:"inline-block",
  //alignItems:"center",
  //justifyContent:"space between",
  width: 400,
  height:30,
  //backgroundColor: "#111",  
  //zIndex:1,
  //background: "#F1F1F1"
},
searchInput:{
  backgroundColor: "transparent",
 
  border:"none",
  paddingLeft:15,
  fontSize:"1.1em",
  width:360,
  height:30,
  fontSize: "2.2em",
  color:" #be64f1",
  contWeight: "bold;"
},

root: {
  flexGrow: 1,
},
paper: {
 // padding: theme.spacing(2),
  margin: 'auto',
  maxWidth: 500,
},
image: {
  width: 128,
  height: 128,
},
img: {
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
},

chart:{
  width: "80%",
  height: "70vh",
  minHeight: 500,

  margin: "0 auto",
  padding: "50px 0"
},

grid:{
  paddingTop:50,
  margin:"0 auto"
},

title: {
  fontSize: "2.2em",
  color:"#be64f1",
  fontWeight: "bold"
},

caseHeading:{
    fontSize: "1.3em",
   
},

casesPosition:{

  alignItems:"center"
},


count: {
  color:"red",
},

footerContainer:{
  height: "100%",
  display: "flex"
 
},
footer:{
  maxWwidth: 1200,
  height:100,
  margin: "10 auto",
  backgroundColor: "#6a149b",
  fontSize:"1.1em",
  color:"#fff"
},

footerContent:{
   height: "100%",
    display: "flex",
    paddingTop:20,
    alignItems:'center',
    justifyContent:'center',
    color:"#fff"
},

tableColumn:{
  border:"1px solid",
  borderColor:"rgb(0, 176, 240)",
  textAlign:"center"
},
option: {
  fontSize: 15,
  '& > span': {
    marginRight: 10,
    fontSize: 18,
  },
},

card:{
    alignItems:'Center',

}
}
export default reportStyle;
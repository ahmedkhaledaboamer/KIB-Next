

let loading = true;

export async function getServices(){

    try{
     const res = await fetch("https://shazmlc.cloud/webhook/service"); 
   
     return await  res.json();
    }catch(error){
     loading=false;
     console.log(error);
     
    }finally{
     loading=false;
   
    }
   
    }
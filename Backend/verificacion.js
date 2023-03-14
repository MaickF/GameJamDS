let userQuery = []
 const [form, setForm] = useState({
   correo: "",
   contrasenha: "",   
   
 });

 const navigate = useNavigate();
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
   // When a post request is sent to the create url, we'll add a new record to the database.
   const res = await fetch("https://localhost:5000/usuarios");   
   if (res.ok) {
     let text = await res.json();    
     console.log("json", res)
     userQuery = []         
     let filteredUser = []    
     filteredUser = text.filter( user =>{      
     return user.correo === form.correo && user.contraseña ===form.contrasenha
    });
    //buscar si hay una contraseña y el correo igual;
    userQuery = filteredUser;   
    getUserFiltered();

    }else {
      return `HTTP error: ${res.status}`;
    }
    setForm({ correo: "", contrasenha: "" });
 }


  const getUserFiltered = ()=>{
  if(userQuery.length===0){    
    alert("Usuario no registrado")
  }else {
    localStorage.setItem("idUsuario",JSON.stringify(userQuery[0]));    
    window.location("/home")            
  }
  
 }
 

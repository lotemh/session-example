let button = document.querySelector('button')
button.onclick = () => {
    axios.get('http://localhost:4000/admin/hello').then((res)=>{
        console.log(res.data)
    })
}
const LogBadge = ({data})=> {
    if (data==="create"){
        return(<span class="badge badge-pill badge-primary">{data}</span>);}
    else if(data==="delete"){
        return(<span class="badge badge-pill badge-danger">{data}</span>);
    }
    else if(data==="view"){
        return(<span class="badge badge-pill badge-info">{data}</span>);
    }
    else {
        return(<span class="badge badge-pill badge-success">{data}</span>);
    }
}
export default LogBadge ;
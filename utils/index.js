const someElementEmpy=(...elements)=>{
    return elements.some(e=>typeof e=='undefined');
}
export {someElementEmpy}

export const PORT=process.env.Port|| 4900;
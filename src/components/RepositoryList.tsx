import { useState, useEffect } from "react";
import { RepositoryItem } from "./RepositoryItem";

import '../styles/repositories.scss'; 
//https://api.github.com/users/Pedro-St/repos
interface Repository{ //não vai o props pois é um estado e n uma propriedade
    name: string;
    description: string;
    html_url: string;

} 

export function RepositoryList () {
   const [repositories, setRepositories] = useState<Repository[]>([]);
   
   useEffect(() => {
    fetch('https://api.github.com/users/Pedro-St/repos')
    .then(response => response.json())
    .then(data => setRepositories(data))
}, []);
 //Não esquecer o segundo parametro
    
   return (
        <section className="repository-list">
            <h1>Lista de repositorios</h1>

            <ul>
                {repositories.map(repository => { 
                    return  <RepositoryItem key={repository.name} repository = {repository} />
                })}
             
            </ul>
        </section>
    )
}


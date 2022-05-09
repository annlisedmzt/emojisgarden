import React, { useEffect, useState, useContext } from 'react';
import './Garden.css';


export default function Garden(props) {
    // console.log('props', props);
    let myGrid = [
        // 0  1  2  3  4 
        ["", "", "", "", ""],//0
        ["", "", "", "", ""],//1
        ["", "", "", "", ""],//2
        ["", "", "", "", ""],//3
        ["", "", "", "", ""],//4
    ];

    // const value = useContext(ThemeContext)


    /* -------------------------------------------------------------------------- */
    /*               Suppression de la plante quand on clique dessus              */
    /* -------------------------------------------------------------------------- */


    const [grid, majGrid] = useState(myGrid);

    /* --------------------- explication non lunaire step 1 --------------------- */
    // const [phrase, changerLaPhrase] = useState('toto');
    /* -------------------------------------------------------------------------- */


    const handleDelete = (indexLine, indexColumn) => { // Le premier paramètre est l'index de line, et le deuxième l'index de column
        console.log('index', indexLine, indexColumn)
        const newGrid = [...grid]; // Clonage de la grid (myGrid) pour effectuer des changements sans toucher à l'ancienne
        newGrid[indexLine][indexColumn] = ""; // je vide la cellule 
        majGrid(newGrid); // Utilise majGrid pour changer la valeur de grid plus haut. Je maj cette nouvelle grille dans laquelle on a modifié les valeurs
    }


    /* -------------------------------------------------------------------------- */
    /*                    Évolution de la plante : 🌱 > 🌿 > 🌳                   */
    /* -------------------------------------------------------------------------- */


    function plantGrow(i, j) {
        const newGrid = [...grid];
        if (newGrid[i][j] === props.theme.emoji01) {
            newGrid[i][j] = props.theme.emoji02;
            majGrid(newGrid);
            setTimeout(() => {
                newGrid[i][j] = props.theme.emoji03;
                majGrid(newGrid);
            }, 2000);
        }
    }


    /* -------------------------------------------------------------------------- */
    /*                  Réaction du bouton : une plante pop                       */
    /* -------------------------------------------------------------------------- */


    const handlePlant = () => {


    /* --------------------- explication non lunaire step 2 --------------------- */
    // console.log('la phrase', phrase);
    // changerLaPhrase('eaopkr zae za');
    // myGrid[0] = ["toto","tata","titi","tutu","tyty"];
    // myGrid[0][0] = "toto"
    // myGrid[0][3] = "tutu"
    /* -------------------------------------------------------------------------- */


        const newGrid = [...grid]; //Clonage de la grid pour faire des changements sans toucher à l'ancienne
        let valueAdded = false; //Variable qui indique ma celulle est vide, donc fausse. Si j'ajoute une valeure, ça devient true.
        // On boucle sur la grille


/* ----------------------------- Solution de Seb ---------------------------- */

        // boucle:for (let i = 0; i < newGrid.length; i++) {

        //     for (let j = 0; j < newGrid.length; j++) {
        //         if (newGrid[i][j]==='')
        //         {
        //             newGrid[i][j] = '🌱'
        //             majGrid(newGrid)
        //             break boucle;
        //         }
        //     }
        // }
/* -------------------------------------------------------------------------- */


        newGrid.some((line, i) => { //On boucle sur la grille
            line.some((cell, j) => { //On refait une boucle cellule par celulle (column) ["", "", "", "", ""]

                if (cell === '') { // Si la celulle (column) est vide
                    newGrid[i][j] = props.theme.emoji01; //On ajoute la plante dans la cellule. Il faut appeler l'index de la ligne et l'index de la colonne pour lui indiquer où mettre la pante.
                    setTimeout(() => { plantGrow(i, j) }, 2000);

                    valueAdded = true; //La cellule n'est plus vide, donc j'indique true.
                    return true; //Fermeture de la bouche en retournant true, car la cellule n'est plus vide. SI ON RETURN FALSE, la boucle continue et ça complète automatiquement toute la ligne.
                } else {
                    return false;
                }
            });
            if (valueAdded) { //Check dans la line si on ajouté ue valeure ou non, si non, on passe à la ligne suivante. 
                return true; // Si la valeur a été ajouté, on ferme la boucle en faisant un return true
            } else {
                return false;
            }
        });
        majGrid(newGrid); //Utilisation de majGrid (setGrid) pour changer la valeur de la grid plus haut. On maj cette nouvelle grid dans laquelle on a update les valeurs.
    }



    /* -------------------------------------------------------------------------- */
    /*                      Affichage de la grid + du boutton                     */
    /* -------------------------------------------------------------------------- */


    return (<div className="d-flex flex-column align-items-center mx-3">


    {/* --------------------- explication non lunaire step 3 --------------------- */}
    {/* <h1>{phrase}</h1> */}
    {/* -------------------------------------------------------------------------- */}



        <table className="garden mt-5">
        
            <tbody>
                {grid.map((row, i) => {
                    return (
                        <tr key={i}>
                            {row.map((cell, j) => {
                                return <td key={j} onClick={() => handleDelete(i, j)}>{cell}</td>;
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
        <button onClick={() => handlePlant()} className="btn btn-primary mt-5">Plant an emoji</button>

    </div>
    );
}


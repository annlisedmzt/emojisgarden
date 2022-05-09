import React, { createContext, useEffect, useState } from 'react';
import Garden from './component/Garden';
import './App.css';

// Le Contexte nous permet de transmettre une prop profondément dans l’arbre des
// composants sans la faire passer explicitement à travers tous les composants.
// Crée un contexte pour le thème (avec “light” comme valeur par défaut).

export const themes =  { //création d'un objet (dico) avec 3 thèmes différents 
    plants: {
        emoji01: '🌱',
        emoji02: '🌿',
        emoji03: '🌳'
        // background: 'black'
    },

    dragons: {
        emoji01: '🐍',
        emoji02: '🦎',
        emoji03: '🐉'
    },

    storm: {
        emoji01: '🌧️',
        emoji02: '🌩️',
        emoji03: '⛈️'
    },
}

export const ThemeContext = createContext(themes.plants); //Constante qui créée un thème "de base" (plants)
// CreatContext : création de props qui sont pour tous les enfants

export const App = () => { //Création de l'app

    const [gardens, addGarden] = useState([]); //Création d'un état qui va stocker le nbr de garden 

    const add = () => { //Fonction qui permet d'ajouter un garden
        const copyGardens = [...gardens]; //Clonage le garden avec l'état au moment actuel
        copyGardens.push(<Layout />) //Push du nouveau garden
        addGarden(copyGardens) //Sauvegarde
    }

    const [selectedTheme, changeSelectedTheme] = useState("plants"); //Création d'un état qui va stocker le type du thème (valeur du select)

    const handleSelectChange = (value) => { //Fonction qui permet de changer la valeur du select 
        changeSelectedTheme(value); //Sauvegarde la valeur du select
        addGarden([]); //À chaque changement du select, je vide les gardens (refresh)
    }

    useEffect(() => { //useEffect permet d'être exécutée selon une condition. La condition c'est la sélection du thème.
        //à chaque fois que je change la valeur de seelctedTheme, ce qu'il y a l'intérieur du useEffect va s'exécuter (fonction Add)
        add();
    }, [selectedTheme])

    return (
        <ThemeContext.Provider value={themes[selectedTheme]}>
            {/* selectTheme : passe la valeur du select, avec la string plants, dragons ou storm */}
            {/* Div APP mise dans le context pour appliquer les changements de thème aux autres components */}

            <div className="App">
                <h1>My Emoji Garden</h1>
                <select onChange={(e) => handleSelectChange(e.target.value)}>
                <option value="plants">🌱</option>
                <option value="dragons">🐍</option>
                <option value="storm">🌧️</option>
            </select>
                <div className="d-flex justify-content-center container">
                    <div className="row justify-content-center">
                        { gardens.map((garden, index) => 
                            <div className="col" style={{minWidth: '33%'}}>
                                {garden}
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <button onClick={() => add()} className="btn btn-primary mt-3 mb-5">Add Garden</button>

                </div>
            </div>
        </ThemeContext.Provider>
    );
}

// Un composant au milieu n’a plus à transmettre explicitement le thème
export class Layout extends React.Component {
    static contextType = ThemeContext; // ?? react ??
    render() {
        return (
            <div>
                <GardenComponent theme={this.context} /> 
                {/* valeur qu'il y a ligne 56 */}
            </div>
        );
    };
}

export const GardenComponent = ({ theme }) => {
    return (
        <Garden theme={theme} />
    )
}
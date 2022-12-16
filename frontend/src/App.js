import React from 'react';
import './App.css';
import { useEffect, useState } from "react";
import { getAllTdl, newTdl, getTdl, deleteOneTdl, updateTdl } from "./services/tdl";
import { Route, Link, Switch } from "react-router-dom";
import { TradingViewStockChartWidget } from 'react-tradingview-components';

import ReactWeather, { useWeatherBit } from 'react-open-weather';



  

function App() 
{

  const queryParams = new URLSearchParams(window.location.search);
  const _idSelect = queryParams.get('_idSelect');



  //const { idTdl } = useParams();
  const [allTdl, setAllTdl] = useState([]);
  useEffect(() => 
  {
      const fetchData = async () => 
      {
          const allTdl = await getAllTdl();
          //console.log(allTdl);
          setAllTdl(allTdl);
      }
      fetchData();
  }, [])



  const [tdl, setTdl] = useState([]);
  const [isloaded, setIsLoaded] = useState(false);
  useEffect(() => 
  {
      const fetchData = async () => 
      {
          const tdl = await getTdl(_idSelect);

          if(_idSelect)
          {
            setIsLoaded(true);
          }
          //console.log(tdl);
          setTdl(tdl);

      }
      fetchData();
  }, [_idSelect])

      
        



        function creatFormTdlSubmit(e) 
        {
          e.preventDefault();
          var creatTdlTitre = document.getElementById('creatTdlTitre').value;
          var creatTdlEcheance = document.getElementById('creatTdlEcheance').value;

          if((creatTdlTitre == "") && (creatTdlEcheance == "") )
          {
            window.alert("vous ne pouvez pas ajouter une liste sans titre et sans date d'échéance");
          }
          else if(creatTdlTitre == "")
          {
            window.alert("vous ne pouvez pas ajouter une liste sans titre");
          }
          else if(creatTdlEcheance == "")
          {
            window.alert("vous ne pouvez pas ajouter une liste sans date d'échéance");
          }
          else
          {
            newTdl(creatTdlTitre, creatTdlEcheance);
          }
          window.location.reload();
        }

        function updateFormTdlSubmit(e) 
        {
          e.preventDefault();
          

          if(_idSelect == "")
          {
            window.alert("vous ne pouvez pas supprimer une liste sans l'avoir selectionnée");
          }
          
          else
          {
            var statutT = document.getElementById('statutT').value;
            var statutF = document.getElementById('statutF').value;
            var statut;

            if(statutT == "true")
            {
              statut= true;
            }
            else
            {
              statut= false; 
            }

            
            updateTdl(_idSelect, statut);
            window.alert("Le statut de la tache a été modifié !!");
          }
          document.location.href="http://localhost:3001/"; 
        }

        

        function deleteFormTdlSubmit(e) 
        {
          e.preventDefault();

          if(_idSelect == "")
          {
            window.alert("vous ne pouvez pas supprimer une liste sans l'avoir selectionnée");
          }
          
          else
          {
            deleteOneTdl(_idSelect);
            window.alert("Votre tache a été Supprimé !!");
          }
          document.location.href="http://localhost:3001/"; 
        }

      
     // newTdl();
     const { data, isLoading, errorMessage } = useWeatherBit({
      key: '0f2cb1f1f7864efcb34b0f5a642289ae',
      lat: '48.137154',
      lon: '11.576124',
      lang: 'fr',
      unit: 'M', // values are (M,S,I)
    });

  function temp() {
    if (!!data) {
      return (
        <div>
          <img className='read_statut_img' src="https://admirweb.com/hassa-adam/ece/react_projet/images/meteo.png"/>
          <h3>
            {data.current.temperature.current} °C
          </h3>
        </div>
      )
    }
  }

  return (

    <div className="App">
      <header className="App-header">
        
      </header>
      <body> 


      <Switch>
        <Route exact path="/">
          <Link to="/page2"> Aller à la page 2</Link>
        <br/><br/><br/>
        <div className="row ligne_widget_1">
          <div className="col-2 meteo_widget">
            <h2>Météo</h2>
            {temp()}
          </div>
          <div className="col-9 graphique_widget">
            <h2>Graphique</h2>
            <div class="tradingview-widget-container">
              <TradingViewStockChartWidget 
              autosize= 'true'
              symbol= 'NASDAQ:AAPL'
              interval= 'D'
              timezone= 'Etc/UTC'
              theme= 'light'
              style= '1'
              locale= 'en'
              toolbar_bg= '#f1f3f6'
              enable_publishing= 'false'
              allow_symbol_change= 'true'
              container_id= 'tradingview_e37b6'
            />
            </div>

          </div>
        </div>
       
        <div className="row ligne_widget_2">
          <div className="col-9 read_widget">
            <h2>Toute vos taches</h2>
            {
              allTdl.map((tdl) =>{
                var read_statut_img ;
                if(tdl.statut == false)
                {
                  read_statut_img = "http://admirweb.com/hassa-adam/ece/react_projet/images/verifier_none.png";
                }
                else
                {
                  read_statut_img = "http://admirweb.com/hassa-adam/ece/react_projet/images/verifier.png";
                }
                return (
                    <a href={'?_idSelect=' + tdl._id} className="row read_tdl_card" key={tdl._id}>
                      <h4 className="col-6 read_tdl_title">{tdl.titre}</h4>
                      <p className="col-3 read_tdl_body">Pour le {tdl.echeance}</p>
                      <div className="col-3 read_tdl_body"><img className="read_statut_img" src={read_statut_img}/></div>
                    </a>
                );
              })
            }
          </div>
          <div className="col-2 update_widget">
            <h2>Statut de votre tache</h2>
            { !isloaded && <> Sélectionnez une tâche</> }
            { isloaded && 
              <div>
              
              <h4 >{tdl.titre}</h4>
              {tdl.statut == true ?
                  (
                  <div>
                    <input type="radio" id="statutT" name="statut" value= "true" checked />
                    <label for="true">Fait</label>
                    <br/>
                    <input type="radio" id="statutF" name="statut" value="false" />
                    <label for="false">À faire</label>
                    <br/>
                      <input type='submit' name='updateFormTdlSubmit' id='updateFormTdlSubmit' value='Valider' className='btn btn-success' onClick={updateFormTdlSubmit}/>
                  </div>
                  )
                  :
                  (
                    <div>
                    <input type="radio" id="statutT" name="statut" value= "true"  />
                    <label for="true">Fait</label>
                    <br/>
                    <input type="radio" id="statutF" name="statut" value="false" checked />
                    <label for="false">À faire</label>
                    <br/>
                      <input type='submit' name='updateFormTdlSubmit' id='updateFormTdlSubmit' value='Valider' className='btn btn-success' onClick={updateFormTdlSubmit}/>
                  </div>
                  )
              }

              </div>
            }
          </div>
        </div>
        <div className="row ligne_widget_3">
          <div className="col-9 creat_widget">
            <h2>Créer une tache</h2>
            <div className='row creatForm'>
              <div className='col'>
                <input type='text' name='creatTdlTitre' id='creatTdlTitre' placeholder='Titre' className='form-control'/>
              </div>

              <div className='col'>
                <input type='date' name='creatTdlEcheance' id='creatTdlEcheance' placeholder='Échéance' className='form-control'/>
              </div>

              <div className='col'>
                <input type='submit' name='creatTdlButton' id='creatTdlButton' value='Ajouter' className='btn btn-dark' onClick={creatFormTdlSubmit}/>
              </div>
            </div>

          </div>
          <div className="col-2 delet_widget">
            <h2>Supprimer la tache</h2>
            { !isloaded && <> Sélectionnez une tâche</> }
            { isloaded && 
              <div>
              
              <h4 >{tdl.titre}</h4>
               
                <input type='submit' name='deleteTdlButton' id='deleteTdlButton' value='Supprimer' className='btn btn-danger' onClick={deleteFormTdlSubmit}/>
              </div>
            }
          </div>
        </div>
        
        </Route>
        <Route path="/page2">
        
        <Link to="/"> Aller à la page 1</Link>
        <br/><br/><br/>
        <div className="row ligne_widget_2">
          <div className="col-9 read_widget">
            <h2>Toute vos taches</h2>
            {
              allTdl.map((tdl) =>{
                var read_statut_img ;
                if(tdl.statut == false)
                {
                  read_statut_img = "http://admirweb.com/hassa-adam/ece/react_projet/images/verifier_none.png";
                }
                else
                {
                  read_statut_img = "http://admirweb.com/hassa-adam/ece/react_projet/images/verifier.png";
                }
                return (
                    <a href={'?_idSelect=' + tdl._id} className="row read_tdl_card" key={tdl._id}>
                      <h4 className="col-6 read_tdl_title">{tdl.titre}</h4>
                      <p className="col-3 read_tdl_body">Pour le {tdl.echeance}</p>
                      <div className="col-3 read_tdl_body"><img className="read_statut_img" src={read_statut_img}/></div>
                    </a>
                );
              })
            }
          </div>
          <div className="col-2 update_widget">
            <h2>Statut de votre tache</h2>
          </div>
        </div>
        <div className="row ligne_widget_3">
          <div className="col-9 creat_widget">
            <h2>Créer une tache</h2>
            <div className='row creatForm'>
              <div className='col'>
                <input type='text' name='creatTdlTitre' id='creatTdlTitre' placeholder='Titre' className='form-control'/>
              </div>

              <div className='col'>
                <input type='date' name='creatTdlEcheance' id='creatTdlEcheance' placeholder='Échéance' className='form-control'/>
              </div>

              <div className='col'>
                <input type='submit' name='creatTdlButton' id='creatTdlButton' value='Ajouter' className='btn btn-dark' onClick={creatFormTdlSubmit}/>
              </div>
            </div>

          </div>
          <div className="col-2 delet_widget">
            <h2>Supprimer la tache</h2>
            { !isloaded && <> Sélectionnez une tâche</> }
            { isloaded && 
              <div>
              
              <h4 >{tdl.titre}</h4>
               
                <input type='submit' name='deleteTdlButton' id='deleteTdlButton' value='Supprimer' className='btn btn-danger' onClick={deleteFormTdlSubmit}/>
              </div>
            }
          </div>
        </div>
        
        </Route>
      </Switch>  


        
      </body>
    </div>
  );
}

export default App;

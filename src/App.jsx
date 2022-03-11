//React
import { useState, useEffect, useRef, createContext } from 'react';

//React-leaflet
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import Icon from './components/Icon';
import 'leaflet/dist/leaflet.css'

//Styles
import './styles/style.css'

//Components
import Header from './components/Header';
import BoxInfo from './components/BoxInfo';

//useContext
export const FunctionForms = createContext();
export const ClearInput = createContext();

function App() {
  //Punto de partida de la App, San Jose(California).
  //Estas coordenadas solo se utilizan una vez, ya que los valores de MapContainer son inmutables y una vez 
  //definidos , no se pueden cambiar.
  const [initialCoords, setInitialCoords] = useState({
    lat: 37.33996194512955,
    lng: -121.88095471810597
  })
  //La IP ingresada por el usuario
  const [searchIp, setSearchIp] = useState(null);
  // Los datos que guardo y muestro en pantalla de la respuesta de la API : IP, LOCACION, ZONA HORARIA E ISP.
  const [ip, setIp] = useState(null);
  const [location, setLocation] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [isp, setIsp] = useState(null);
  //Coordenadas que se van actualizando con la respuesta de la API
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0
  })
  //Para renderizar una sola vez la posicion actual
  const count = useRef(0);
  //Aca se hace una peticion a la API y la respuesta son los datos de la posicion actual del usuario
  //Se efectua una sola vez
  useEffect(() => {
    alert("--> SI EL MAPA NO SE MUEVE AUTOMATICAMENTE HABILITA EL GPS Y RECARGA LA PAGINA \n-->  IF THE MAP DOES NOT MOVE AUTOMATICALLY ENABLE GPS AND RELOAD PAGE.")

    fetch("https://api.ipdata.co?api-key=API_KEY")
      .then(res => res.json()).
      then(data => {
        setIp(data.ip);
        setLocation(data.city);
        setTimezone(data.time_zone.offset);
        setIsp(data.asn.domain);
      })
  }, [])
  //Toma la entrada del usuario y la guarda.
  function handleChangeIP(e) {
    const searchIp = e.target.value;
    setSearchIp(searchIp)
  }
  //Toma la IP que introdujo el usuario
  //Si cumple con el regex y searchIp no es indefinido(osea , que los valores lat y lng no son cero) 
  //hace la peticion al usuario sobre la geolocalizacion de la ip introducida.
  function searchData(e) {
    e.preventDefault();
    let ipv46_regex = /(?:^(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}$)|(?:^(?:(?:[a-fA-F\d]{1,4}:){7}(?:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){6}(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|:[a-fA-F\d]{1,4}|:)|(?:[a-fA-F\d]{1,4}:){5}(?::(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,2}|:)|(?:[a-fA-F\d]{1,4}:){4}(?:(?::[a-fA-F\d]{1,4}){0,1}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,3}|:)|(?:[a-fA-F\d]{1,4}:){3}(?:(?::[a-fA-F\d]{1,4}){0,2}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,4}|:)|(?:[a-fA-F\d]{1,4}:){2}(?:(?::[a-fA-F\d]{1,4}){0,3}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,5}|:)|(?:[a-fA-F\d]{1,4}:){1}(?:(?::[a-fA-F\d]{1,4}){0,4}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,6}|:)|(?::(?:(?::[a-fA-F\d]{1,4}){0,5}:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)(?:\\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)){3}|(?::[a-fA-F\d]{1,4}){1,7}|:)))(?:%[0-9a-zA-Z]{1,})?$)/gm;

    if (searchIp !== undefined && ipv46_regex.test(searchIp) && searchIp.length > 6) {
      fetch(`https://api.ipdata.co/${searchIp}?api-key=API_KEY`)
        .then(res => res.json()).
        then(data => {
          setIp(data.ip);
          setLocation(data.city ?? data.country_name);
          setTimezone(data.time_zone.offset);
          setIsp(data.asn.domain ?? data.asn.name);
          setCoords({
            lat: data.latitude,
            lng: data.longitude
          })
        })
      count.current++
    } else {
      alert("INGRESE UNA DIRECCION IP VALIDA POR FAVOR")
    }
    setSearchIp('')
  }
  //Este codigo fue tomado de "https://codesandbox.io/s/how-to-locate-react-leaflet-v3x-map-to-users-current-position-and-get-the-borders-for-this-map-g1onh?file=/src/App.js"
  //Le anadi: Un timer ,para demorar la transicion y que no sea tan "brusca".
  //Le pase las coordenadas que se obtienen de la IP que introduce el usuario, y 
  //con esas coordenadas se reposiciona el mapa a la nueva ubicacion, y retorna el marcador en la nueva posicion.
  function CurrentLocationMarker(newCoords) {
    const [position, setPosition] = useState(null);
    const map = useMap();

    useEffect(() => {
      setTimeout(() => {
        if (newCoords.coords === undefined) {
          map.locate().on('locationfound', function (e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
          })
        } else {
          setPosition(newCoords.coords);
          map.flyTo(newCoords.coords, map.getZoom())
        }
      }, 1300)
    }, [map]);

    return position === null ? null : (
      <Marker position={position}>
        <Popup>
          Estas Aca
        </Popup>
      </Marker>
    )
  }

  return (
    <ClearInput.Provider value={{searchIp}}>
      <FunctionForms.Provider value={{ handleChangeIP, searchData }}>
        <div className="App">
          <Header  />
          <BoxInfo ip={ip} location={location} timezone={timezone} isp={isp} />
          {/* Leaflet Map */}
          <MapContainer className='mapContainer' center={[initialCoords.lat, initialCoords.lng]} zoom={13} >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="	https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {count.current == 0 ? <CurrentLocationMarker zoom={13} /> : <CurrentLocationMarker coords={coords} zoom={13} />}
          </MapContainer>
        </div>
      </FunctionForms.Provider>
    </ClearInput.Provider>
  )
}

export default App

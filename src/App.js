import React from 'react';
import { getSignature } from './components/zoom'

function App() {
  function submit(event) {
    event.preventDefault();

    const meetConfig = {
      apiKey: "Sua Api Key",
      apiSecret: "Sua Api Secrete",
      meetingNumber: event.target['meeting_number'].value,
      leaveUrl: '',
      userName: event.target['display_name'].value,
      userEmail: '',
      passWord: event.target['meeting_pwd'].value,
      role: parseInt(event.target['meeting_role'].value) // 1 para host, 0 para participante ou webinar
    }
    // console.log(meetConfig)

    getSignature(meetConfig);
  }

  return (
    <div className="App">
      <nav id="nav-tool" className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <h1 className="navbar-brand">Zoom</h1>
          </div>
          <div id="navbar" className="websdktest">
            <form className="navbar-form navbar-right" id="meeting_form"
              onSubmit={submit}>
              <div className="form-group" style={{ marginRight: 15 }}>
                <input type="text" name="display_name" id="display_name" maxLength="100"
                  placeholder="Nome" className="form-control" required />
              </div>

              <div className="form-group" style={{ marginRight: 15 }}>
                <input type="text" name="meeting_number" id="meeting_number" maxLength="11"
                  style={{ width: 150 }} placeholder="Numero da Reunião" className="form-control" required />
              </div>

              <div className="form-group" style={{ marginRight: 15 }}>
                <input type="text" name="meeting_pwd" id="meeting_pwd" style={{ width: 150 }}
                  maxLength="32" placeholder="Senha da Reunião" className="form-control" />
              </div>

              <div className="form-group" style={{ marginRight: 15 }}>
                <select id="meeting_role" className="sdk-select">
                  <option value={0}>Participante</option>
                  {/* <option value={1}>Host</option>*/}
                </select>
              </div>
              <button type="submit" className="btn btn-primary" id="join_meeting">Juntar-se</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default App;

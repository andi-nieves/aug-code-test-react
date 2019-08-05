import React, { useState } from "react";
import "./App.css";
import { sortBy } from "lodash";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const GET_DOGS = gql`
  {
    data
  }
`;

function App() {
  const [filter, setFilter] = useState("datetime");
  function renderRow(data) {
    const f = sortBy(data, filter);
    return f.map(d => (
      <tr key={Math.random()}>
        <td>{d.datetime}</td>
        <td>{d.device}</td>
        <td>{d.ip}</td>
      </tr>
    ));
  }
  function renderResult(data) {
    return (
      <React.Fragment>
        <p>Click the header to sort</p>
        <table>
          <thead>
            <tr>
              <th onClick={() => setFilter("datetime")}>Date Time</th>
              <th onClick={() => setFilter("device")}>Device</th>
              <th onClick={() => setFilter("ip")}>IP</th>
            </tr>
          </thead>
          <tbody>{renderRow(data)}</tbody>
        </table>
      </React.Fragment>
    );
  }
  return (
    <div className="App">
      <h1>Code test {filter}</h1>
      <Query query={GET_DOGS}>
        {({ loading, error, data }) => {
          if (data.data) {
            const _data = JSON.parse(data.data);
            return renderResult(_data);
          }
          return <div />;
        }}
      </Query>
    </div>
  );
}

export default App;

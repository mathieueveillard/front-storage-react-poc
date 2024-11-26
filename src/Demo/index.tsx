import React from "react";
import A from "./A";
import B from "./B";
import GlobalState from "./GlobalState";

const Component: React.FunctionComponent = () => (
  <div>
    <GlobalState />
    <table>
      <thead>
        <tr>
          <td>
            <b>Component A</b>
          </td>
          <td>
            <b>Component B</b>
          </td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <A />
          </td>
          <td>
            <B />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default Component;

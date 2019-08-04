/* eslint-env jest */
import * as React from "react";
import { render, cleanup } from "@testing-library/react";
import { toHaveClass } from "@testing-library/jest-dom";
import { MobileEventRow } from "../components/MobileEventRow";

expect.extend({ toHaveClass });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

let subject;
let event;
let isActive;
let onClick;

function loadSubject(props = {}) {
  event = {
    name: "name",
    url: "http://url.com",
    date: "September 30, 2018",
    cfpClose: "September 30, 2018",
    cfpUrl: "http://url.com",
    location: "Chicago, IL",
    eventTags: "Javascript, Ruby, Tech",
    city: "Chicago",
    country: "United States",
    countryCode: "US",
    contintent: "North America",
    lat: 41,
    lng: -55
  };

  onClick = jest.fn();
  isActive = false;

  subject = (
    <MobileEventRow
      className="EventRow"
      cellClassName="EventRow-cell"
      event={event}
      isActive={isActive}
      onClick={onClick}
      {...props}
    />
  );
}

describe("when not active", () => {
  it("renders properly", () => {
    loadSubject();
    const { getByTestId } = render(subject);

    const container = getByTestId("MobileEventRow");
    expect(container).not.toHaveClass("EventRow--active");
  });
});

describe("when active", () => {
  it("renders properly", () => {
    loadSubject({ isActive: true });
    const { getByTestId } = render(subject);

    const container = getByTestId("MobileEventRow");

    expect(container).toHaveClass("EventRow--active");
  });
});

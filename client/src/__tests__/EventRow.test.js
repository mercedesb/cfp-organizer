/* eslint-env jest */
import * as React from "react";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { toHaveAttribute } from "@testing-library/jest-dom";
import { EventRow } from "../components/EventRow";

expect.extend({ toHaveAttribute });

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

let subject;
let event;

function loadSubject(props = {}) {
  event = {
    name: "name",
    url: "http://url.com",
    date: "September 30, 2019",
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

  subject = (
    <EventRow
      className="EventRow"
      cellClassName="EventRow-cell"
      event={event}
      {...props}
    />
  );
}

describe("EventRow", () => {
  describe("#render", () => {
    it("renders a like button by default", () => {
      loadSubject();
      const { getByTestId } = render(subject);

      const likedButtonSvg = getByTestId("LikedButton");
      expect(likedButtonSvg).not.toBeNull();
    });

    it("renders a link to the event url if present", () => {
      loadSubject();
      const { getByText } = render(subject);

      const eventLink = getByText(event.name);
      expect(eventLink).not.toBeNull();
    });

    it("renders a link to the cfp url if present", () => {
      loadSubject();
      const { getByText } = render(subject);

      const cfpLink = getByText(event.cfpClose);
      expect(cfpLink).not.toBeNull();
    });
  });

  describe("clicking on the liked button", () => {
    it("fills the liked button svg", () => {
      loadSubject();
      const { getByTestId } = render(subject);

      const likedButton = getByTestId("LikedButton");
      fireEvent.click(likedButton);

      expect(getByTestId("LikedSvgPath")).toHaveAttribute("fill", "#0074d9");
    });
  });
});

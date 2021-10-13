import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";
import user from "@testing-library/user-event";

describe("Counter", () => {
  describe("initialized with defaultCount=0 and description=My Counter", () => {
    beforeEach(() => {
      render(<Counter defaultCount={0} description="My Counter" />);
    });

    it("renders title as My Counter", () => {
      expect(screen.getByText(/My Counter/)).toBeInTheDocument();
    });

    it("renders Current Count: 0", () => {
      expect(screen.getByText("Current Count: 0")).toBeInTheDocument();
    });

    describe("when + is clicked", () => {
      beforeEach(async () => {
        fireEvent.click(
          screen.getByRole("button", { name: "Increment Counter" })
        );
        await screen.findByText("Current Count: 1");
      });

      it("renders Current Count: 1", () => {
        expect(screen.getByText("Current Count: 1")).toBeInTheDocument();
      });
    });

    describe("when - is clicked", () => {
      beforeEach(() => {
        fireEvent.click(
          screen.getByRole("button", { name: "Decrement Counter" })
        );
      });

      it("renders Current Count: -1", () => {
        expect(screen.getByText("Current Count: -1")).toBeInTheDocument();
      });
    });
  });

  describe("initialized with defaultCount=10 and description=WWW", () => {
    beforeEach(() => {
      render(<Counter defaultCount={10} description="WWW" />);
    });

    it("renders title as WWW", () => {
      expect(screen.getByText(/WWW/)).toBeInTheDocument();
    });

    it("renders Current Count: 10", () => {
      expect(screen.getByText("Current Count: 10")).toBeInTheDocument();
    });

    describe("when the step changes to 5", () => {
      beforeEach(() => {
        user.type(screen.getByLabelText(/Step/), "{selectall}5");
      });

      describe("when + button is clicked", () => {
        beforeEach(async () => {
          user.click(screen.getByRole("button", { name: "Increment Counter" }));
          await screen.findByText("Current Count: 15");
        });

        it("renders Current Count: 15", () => {
          expect(screen.getByText("Current Count: 15")).toBeInTheDocument();
        });

        describe("when the incrementor changes to empty string and + button is clicked", () => {
          beforeEach(async () => {
            user.type(screen.getByLabelText(/Step/), "{selectall}{delete}");
            user.click(
              screen.getByRole("button", { name: "Increment Counter" })
            );
            await screen.findByText("Current Count: 16");
          });

          it("renders Current Count: 16", () => {
            expect(screen.getByText("Current Count: 16")).toBeInTheDocument();
          });
        });
      });

      describe("when - button is clicked", () => {
        beforeEach(() => {
          user.click(screen.getByRole("button", { name: "Decrement Counter" }));
        });

        it("renders Current Count: 5", () => {
          expect(screen.getByText("Current Count: 5")).toBeInTheDocument();
        });
      });
    });
  });
});

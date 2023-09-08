import { fireEvent, render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import AppWithProviders from "../src/App";
import { format, addMinutes } from "date-fns";
import { entriesStorage } from "../src/infrastructure/entriesStorage";

const adjustDateToTimezone = (date) => {
  return addMinutes(date, new Date().getTimezoneOffset());
};

const formatDateForDisplayField = (date) => {
  return format(date, "M/d/yyyy");
};

const formatDateForInputValue = (date) => {
  return format(date, "yyyy-MM-dd");
};

const buildTestIdQuery = (testId) => {
  return `[data-testid="${testId}"]`;
};

afterEach(() => {
  entriesStorage.clear();
  cleanup();
});

describe("When viewing entries", () => {
  const setup = () => {
    const initialEntries = [
      {
        id: "1",
        label: "Potatoes",
        amount: 3.45,
        date: new Date("2023-05-05"),
      },
      {
        id: "2",
        label: "Tomatoes",
        amount: 2.45,
        date: new Date("2023-05-12"),
      },
      {
        id: "3",
        label: "Cucumbers",
        amount: 1.45,
        date: new Date("2023-05-23"),
      },
    ];

    entriesStorage.store(initialEntries);

    const pageHandles = render(<AppWithProviders />);

    return {
      pageHandles,
      initialEntries,
    };
  };

  it("Displays stored entries", () => {
    const { initialEntries, pageHandles } = setup();

    const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");

    initialEntries.forEach((entry, index) => {
      const entryLabel = dashboardEntries[index].querySelector(
        buildTestIdQuery("dashboardEntryLabel")
      );
      const entryAmount = dashboardEntries[index].querySelector(
        buildTestIdQuery("dashboardEntryAmount")
      );
      const entryDate = dashboardEntries[index].querySelector(
        buildTestIdQuery("dashboardEntryDate")
      );

      expect.soft(entryLabel).toHaveTextContent(entry.label);
      expect.soft(entryAmount).toHaveTextContent(`$ ${entry.amount}`);
      expect
        .soft(entryDate)
        .toHaveTextContent(formatDateForDisplayField(entry.date));
    });
  });
});

describe("When adding a new entry", () => {
  const setup = () => {
    const pageHandles = render(<AppWithProviders />);

    return {
      pageHandles,
    };
  };

  it("Adds entry successfully", () => {
    const { pageHandles } = setup();

    const newEntryButton = pageHandles.getByTestId("newEntryButton");
    fireEvent.click(newEntryButton);

    expect(pageHandles.getByText("New Entry")).toBeVisible();

    const label = "Potatoes";
    const amount = "3.45";
    const date = "2023-05-05";

    const labelInput = pageHandles.getByTestId("labelInput");
    const amountInput = pageHandles.getByTestId("amountInput");
    const dateInput = pageHandles.getByTestId("dateInput");

    fireEvent.change(labelInput, { target: { value: label } });
    fireEvent.change(amountInput, { target: { value: amount } });
    fireEvent.change(dateInput, { target: { value: date } });

    const saveButton = pageHandles.getByTestId("saveButton");
    fireEvent.click(saveButton);

    const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");
    expect(dashboardEntries).toHaveLength(1);

    const createdEntryLabel = pageHandles.getAllByTestId(
      "dashboardEntryLabel"
    )[0];
    const createdEntryAmount = pageHandles.getAllByTestId(
      "dashboardEntryAmount"
    )[0];
    const createdEntryDate =
      pageHandles.getAllByTestId("dashboardEntryDate")[0];

    expect.soft(createdEntryLabel).toHaveTextContent(label);
    expect.soft(createdEntryAmount).toHaveTextContent(`$ ${amount}`);
    expect
      .soft(createdEntryDate)
      .toHaveTextContent(
        formatDateForDisplayField(adjustDateToTimezone(new Date(date)))
      );
  });
});

describe("When editing entry", () => {
  const setup = () => {
    const initialEntries = [
      {
        id: "1",
        label: "Potatoes",
        amount: 3.45,
        date: new Date("2023-05-05"),
      },
      {
        id: "2",
        label: "Tomatoes",
        amount: 2.45,
        date: new Date("2023-05-12"),
      },
      {
        id: "3",
        label: "Cucumbers",
        amount: 1.45,
        date: new Date("2023-05-23"),
      },
    ];

    entriesStorage.store(initialEntries);

    const pageHandles = render(<AppWithProviders />);

    return {
      pageHandles,
      initialEntries,
    };
  };

  it("Shows edit entry form with existing entry data and edits entries successfully", () => {
    const { initialEntries, pageHandles } = setup();

    const secondEntry = initialEntries[1];

    const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");

    const secondEntryEditButton = dashboardEntries[1].querySelector(
      buildTestIdQuery("dashboardEntryEditButton")
    );
    fireEvent.click(secondEntryEditButton);

    expect(pageHandles.getByText("Edit Entry")).toBeVisible();

    const labelInput = pageHandles.getByTestId("labelInput");
    const amountInput = pageHandles.getByTestId("amountInput");
    const dateInput = pageHandles.getByTestId("dateInput");

    expect(labelInput).toHaveValue(secondEntry.label);
    expect(amountInput).toHaveValue(secondEntry.amount.toString());
    expect(dateInput).toHaveValue(formatDateForInputValue(secondEntry.date));

    const newLabel = "Rice";
    const newAmount = 200.01;
    const newDate = "2023-05-13";

    fireEvent.change(labelInput, { target: { value: newLabel } });
    fireEvent.change(amountInput, { target: { value: newAmount } });
    fireEvent.change(dateInput, { target: { value: newDate } });

    const saveButton = pageHandles.getByTestId("saveButton");
    fireEvent.click(saveButton);

    const updatedDashboardEntries =
      pageHandles.getAllByTestId("dashboardEntry");

    expect(updatedDashboardEntries).toHaveLength(3);

    const updatedDashboardEntry = updatedDashboardEntries[1];

    const updatedEntryLabel = updatedDashboardEntry.querySelector(
      buildTestIdQuery("dashboardEntryLabel")
    );
    const updatedEntryAmount = updatedDashboardEntry.querySelector(
      buildTestIdQuery("dashboardEntryAmount")
    );
    const updatedEntryDate = updatedDashboardEntry.querySelector(
      buildTestIdQuery("dashboardEntryDate")
    );

    expect.soft(updatedEntryLabel).toHaveTextContent(newLabel);
    expect.soft(updatedEntryAmount).toHaveTextContent(`$ ${newAmount}`);
    expect
      .soft(updatedEntryDate)
      .toHaveTextContent(
        formatDateForDisplayField(adjustDateToTimezone(new Date(newDate)))
      );
  });
});

describe("When deleting entry", () => {
  const setup = () => {
    const initialEntries = [
      {
        id: "1",
        label: "Potatoes",
        amount: 3.45,
        date: new Date("2023-05-05"),
      },
      {
        id: "2",
        label: "Tomatoes",
        amount: 2.45,
        date: new Date("2023-05-12"),
      },
      {
        id: "3",
        label: "Cucumbers",
        amount: 1.45,
        date: new Date("2023-05-23"),
      },
    ];

    entriesStorage.store(initialEntries);

    const pageHandles = render(<AppWithProviders />);

    return {
      pageHandles,
      initialEntries,
    };
  };

  it("Deletes entry successfully", () => {
    const { pageHandles, initialEntries } = setup();

    const secondEntry = initialEntries[1];

    const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");
    const secondEntryDeleteButton = dashboardEntries[1].querySelector(
      buildTestIdQuery("dashboardEntryDeleteButton")
    );

    fireEvent.click(secondEntryDeleteButton);

    const updatedDashboardEntries =
      pageHandles.getAllByTestId("dashboardEntry");

    expect(updatedDashboardEntries).toHaveLength(2);

    expect(pageHandles.queryByText(secondEntry.label)).not.toBeInTheDocument();
  });
});

describe("When using keyboard shortcuts", () => {
  const setup = () => {
    const initialEntries = [
      {
        id: "1",
        label: "Potatoes",
        amount: 3.45,
        date: new Date("2023-05-05"),
      },
      {
        id: "2",
        label: "Tomatoes",
        amount: 2.45,
        date: new Date("2023-05-12"),
      },
      {
        id: "3",
        label: "Cucumbers",
        amount: 1.45,
        date: new Date("2023-05-23"),
      },
    ];

    entriesStorage.store(initialEntries);

    const pageHandles = render(<AppWithProviders />);

    return {
      pageHandles,
      initialEntries,
    };
  };

  describe("When pressing Escape in New Entry Form", () => {
    const secondSetup = () => {
      const { pageHandles } = setup();

      fireEvent.click(pageHandles.getByTestId("newEntryButton"));

      return {
        pageHandles,
      };
    };

    it("Goes back to Dashboard", () => {
      const { pageHandles } = secondSetup();

      fireEvent.keyDown(window, { key: "Escape" });

      expect(pageHandles.getByTestId("newEntryButton")).toBeVisible();
    });
  });

  describe("When pressing Escape in Edit Entry Form", () => {
    const secondSetup = () => {
      const { initialEntries, pageHandles } = setup();

      const firstEntry = initialEntries[0];

      const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");
      const firstEntryEditButton = dashboardEntries[0].querySelector(
        buildTestIdQuery("dashboardEntryEditButton")
      );

      fireEvent.click(firstEntryEditButton);

      return {
        pageHandles,
        firstEntry,
      };
    };

    it("Goes back to Dashboard", () => {
      const { pageHandles } = secondSetup();

      fireEvent.keyDown(window, { key: "Escape" });

      expect(pageHandles.getByTestId("newEntryButton")).toBeVisible();
    });
  });

  describe("When pressing Enter in New Entry Form", () => {
    const secondSetup = () => {
      const { pageHandles } = setup();

      fireEvent.click(pageHandles.getByTestId("newEntryButton"));

      const label = "Potatoes";
      const amount = "3.45";
      const date = "2023-10-05";

      const labelInput = pageHandles.getByTestId("labelInput");
      const amountInput = pageHandles.getByTestId("amountInput");
      const dateInput = pageHandles.getByTestId("dateInput");

      fireEvent.change(labelInput, { target: { value: label } });
      fireEvent.change(amountInput, { target: { value: amount } });
      fireEvent.change(dateInput, { target: { value: date } });

      return {
        label,
        amount,
        date,
        pageHandles,
      };
    };

    it("Adds entry successfully", () => {
      const { pageHandles, label, amount, date } = secondSetup();

      fireEvent.keyDown(window, { key: "Enter" });

      const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");
      expect(dashboardEntries).toHaveLength(4);

      const createdEntryLabel = pageHandles.getAllByTestId(
        "dashboardEntryLabel"
      )[0];
      const createdEntryAmount = pageHandles.getAllByTestId(
        "dashboardEntryAmount"
      )[0];
      const createdEntryDate =
        pageHandles.getAllByTestId("dashboardEntryDate")[3];

      expect.soft(createdEntryLabel).toHaveTextContent(label);
      expect.soft(createdEntryAmount).toHaveTextContent(`$ ${amount}`);
      expect
        .soft(createdEntryDate)
        .toHaveTextContent(
          formatDateForDisplayField(adjustDateToTimezone(new Date(date)))
        );
    });
  });

  describe("When pressing Enter in Edit Entry Form", () => {
    const secondSetup = () => {
      const { initialEntries, pageHandles } = setup();

      const secondEntry = initialEntries[1];

      const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");

      const secondEntryEditButton = dashboardEntries[1].querySelector(
        buildTestIdQuery("dashboardEntryEditButton")
      );
      fireEvent.click(secondEntryEditButton);

      expect(pageHandles.getByText("Edit Entry")).toBeVisible();

      const labelInput = pageHandles.getByTestId("labelInput");
      const amountInput = pageHandles.getByTestId("amountInput");
      const dateInput = pageHandles.getByTestId("dateInput");

      expect(labelInput).toHaveValue(secondEntry.label);
      expect(amountInput).toHaveValue(secondEntry.amount.toString());
      expect(dateInput).toHaveValue(formatDateForInputValue(secondEntry.date));

      const newLabel = "Rice";
      const newAmount = 200.01;
      const newDate = "2023-05-13";

      fireEvent.change(labelInput, { target: { value: newLabel } });
      fireEvent.change(amountInput, { target: { value: newAmount } });
      fireEvent.change(dateInput, { target: { value: newDate } });

      return {
        pageHandles,
        newLabel,
        newAmount,
        newDate,
      };
    };

    it("Edits entry successfully", () => {
      const { newAmount, newDate, newLabel, pageHandles } = secondSetup();

      fireEvent.keyDown(window, { key: "Enter" });

      const updatedDashboardEntries =
        pageHandles.getAllByTestId("dashboardEntry");

      expect(updatedDashboardEntries).toHaveLength(3);

      const updatedDashboardEntry = updatedDashboardEntries[1];

      const updatedEntryLabel = updatedDashboardEntry.querySelector(
        buildTestIdQuery("dashboardEntryLabel")
      );
      const updatedEntryAmount = updatedDashboardEntry.querySelector(
        buildTestIdQuery("dashboardEntryAmount")
      );
      const updatedEntryDate = updatedDashboardEntry.querySelector(
        buildTestIdQuery("dashboardEntryDate")
      );

      expect.soft(updatedEntryLabel).toHaveTextContent(newLabel);
      expect.soft(updatedEntryAmount).toHaveTextContent(`$ ${newAmount}`);
      expect
        .soft(updatedEntryDate)
        .toHaveTextContent(
          formatDateForDisplayField(adjustDateToTimezone(new Date(newDate)))
        );
    });
  });

  describe("When pressing Delete in Edit Entry Form", () => {
    const secondSetup = () => {
      const { pageHandles, initialEntries } = setup();

      const secondEntry = initialEntries[1];

      const dashboardEntries = pageHandles.getAllByTestId("dashboardEntry");
      const secondEntryEditButton = dashboardEntries[1].querySelector(
        buildTestIdQuery("dashboardEntryEditButton")
      );

      fireEvent.click(secondEntryEditButton);

      return {
        secondEntry,
        pageHandles,
      };
    };

    it("Deletes entry successfully", () => {
      const { pageHandles, secondEntry } = secondSetup();

      fireEvent.keyDown(window, { key: "Delete" });

      const updatedDashboardEntries =
        pageHandles.getAllByTestId("dashboardEntry");

      expect(updatedDashboardEntries).toHaveLength(2);

      expect(
        pageHandles.queryByText(secondEntry.label)
      ).not.toBeInTheDocument();
    });
  });
});

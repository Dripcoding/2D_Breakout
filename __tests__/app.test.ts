const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

describe("application", () => {
  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe("navigation bar", () => {

    test("it should have a main icon", () => {
      const navBarItem = document.querySelectorAll(".nav-item");
      expect(navBarItem).not.toBeNull();
      expect(navBarItem.length).toBe(4);

      const navBar = document.querySelector(".navbar");
      const navBarBrand = document.querySelector(".navbar-brand");
      const navBarToggler = document.querySelector(".navbar-toggler");

      // nav bar brand
      expect(navBar).not.toBeNull();
      expect(navBarBrand).not.toBeNull();
      expect(navBarBrand instanceof HTMLAnchorElement).toBe(true);
      expect(navBarBrand?.textContent).toBe("2D Breakout");
      expect(navBarToggler).not.toBeNull();
    });

    test("it should have an about link", () => {
      const navBarItem = document.querySelectorAll(".nav-item");
      const aboutLink = navBarItem[0];

      expect(aboutLink instanceof HTMLAnchorElement).toBe(true);
      expect(aboutLink.textContent).toBe("About");
      expect(aboutLink.getAttribute("data-toggle")).toBe("modal");
      expect(aboutLink.getAttribute("data-target")).toBe("#aboutModal");
      expect(aboutLink.getAttribute("id")).toBe("aboutModalLink");
    });

    test("it should have a controls link", () => {
      const navBarItem = document.querySelectorAll(".nav-item");
      const controlsLink = navBarItem[1];

      expect(controlsLink instanceof HTMLAnchorElement).toBe(true);
      expect(controlsLink.textContent).toBe("Controls");
      expect(controlsLink.getAttribute("data-toggle")).toBe("modal");
      expect(controlsLink.getAttribute("data-target")).toBe("#controlsModal");
      expect(controlsLink.getAttribute("id")).toBe("controlsModalLink");
    });

    test("it should have a github link", () => {
      const navBarItem = document.querySelectorAll(".nav-item");
      const githubLink = navBarItem[2];

      expect(githubLink instanceof HTMLAnchorElement).toBe(true);
      expect(githubLink.textContent).toBe("Github Repo");
      expect(githubLink.getAttribute("href")).toBe(
        "https://github.com/JustinSHong/2D_Breakout"
      );
    });

    test("it should have a settings link", () => {
      const navBarItem = document.querySelectorAll(".nav-item");
      const settingsLink = navBarItem[3];

      expect(settingsLink instanceof HTMLAnchorElement).toBe(true);
      expect(settingsLink.textContent).toBe("Settings");
      expect(settingsLink.getAttribute("data-toggle")).toBe("modal");
      expect(settingsLink.getAttribute("data-target")).toBe("#settingsModal");
      expect(settingsLink.getAttribute("id")).toBe("settingsModalLink");
    });
  });

  describe("about modal", () => {
    test("it should have a header", () => {
      const aboutModal = document.querySelector("#aboutModal");
      expect(aboutModal).not.toBeNull();
      expect(aboutModal?.getAttribute("id")).toBe("aboutModal");

      const header = document.querySelector(".modal-title");
      expect(header).not.toBeNull();
      expect(header instanceof HTMLHeadingElement).toBe(true);
      expect(header?.textContent).toBe("About");
      expect(header?.getAttribute("id")).toBe("aboutModalLabel");
    });

    test("it should have a body", () => {
      const body = document.querySelector(".modal-body");
      const bodyTitle = body?.children[0];
      const bodyList = body?.children[1];

      expect(body).not.toBeNull();
      expect(bodyTitle).not.toBeNull();
      expect(bodyTitle instanceof HTMLParagraphElement).toBe(true);
      expect(bodyTitle?.textContent).toBe("A 2D break out game made with:");

      expect(bodyList).not.toBeNull();
      expect(bodyList?.children.length).toBe(4);

      const listElement1 = bodyList?.children[0];
      expect(listElement1).not.toBeNull();
      expect(listElement1 instanceof HTMLLIElement).toBe(true);
      expect(listElement1?.textContent).toBe("HTML5");

      const listElement2 = bodyList?.children[1];
      expect(listElement2).not.toBeNull();
      expect(listElement2 instanceof HTMLLIElement).toBe(true);
      expect(listElement2?.textContent).toBe("CSS3");


      const listElement3 = bodyList?.children[2];
      expect(listElement3).not.toBeNull();
      expect(listElement3 instanceof HTMLLIElement).toBe(true);
      expect(listElement3?.textContent).toBe("Typescript");

      const listElement4 = bodyList?.children[3];
      expect(listElement4).not.toBeNull();
      expect(listElement4 instanceof HTMLLIElement).toBe(true);
      expect(listElement4?.textContent).toBe("Node.js / Express");
    });

    test("it should have a close button", () => {
      const closeButton = document.querySelector(".close");

      expect(closeButton).not.toBeNull();
      expect(closeButton instanceof HTMLButtonElement).toBe(true);
      expect(closeButton?.getAttribute("type")).toBe("button");
      expect(closeButton?.getAttribute("data-dismiss")).toBe("modal");
    });

    test("it should have a github link", () => {
      const repoLink = document.querySelector("#githubRepoLink");

      expect(repoLink).not.toBeNull();
      expect(repoLink?.getAttribute("href")).toBe(
        "https://github.com/JustinSHong/2D_Breakout"
      );
    });
  });

  describe("settings modal", () => {

    test("it should have a header", () => {
      const settingsModal = document.querySelector("#settingsModal");
      expect(settingsModal).not.toBeNull();
      expect(settingsModal?.getAttribute("id")).toBe("settingsModal");

      const header = document.querySelectorAll(".modal-title")[1];

      expect(header).not.toBeNull();
      expect(header instanceof HTMLHeadingElement).toBe(true);
      expect(header?.textContent).toBe("Settings");
    });

    test("it should have a close button", () => {
      const closeButton = document.querySelector(".close");

      expect(closeButton).not.toBeNull();
      expect(closeButton instanceof HTMLButtonElement).toBe(true);
      expect(closeButton?.getAttribute("type")).toBe("button");
      expect(closeButton?.getAttribute("data-dismiss")).toBe("modal");
    });

    test("it should have a scoreboard reset button", () => {
      const resetButton = document.getElementById("scoreBoardResetBtn");

      expect(resetButton).not.toBeNull();
      expect(resetButton instanceof HTMLButtonElement).toBe(true);
      expect(resetButton?.textContent).toBe("Reset scoreboard");
    });

    test("it should have a checkbox to toggle borders", () => {
      const borderCheckboxBtn = document.getElementById("borderColorCheckBox")

      expect(borderCheckboxBtn).not.toBeNull()
      expect(borderCheckboxBtn instanceof HTMLInputElement).toBe(true)
    })

    describe("game mode select", () => {

      test("it should render correctly", () => {
        const body = document.querySelector(".form-group");
        const gameModeLabel = body?.children[0];
        const gameModeSelect = body?.children[1];

        expect(gameModeLabel).not.toBeNull();
        expect(gameModeLabel instanceof HTMLLabelElement).toBe(true);
        expect(gameModeLabel?.textContent).toBe("Game Modes");
        expect(gameModeLabel?.getAttribute("for")).toBe("gameModeSelect");

        expect(gameModeSelect).not.toBeNull();
        expect(gameModeSelect instanceof HTMLSelectElement).toBe(true);
        expect(gameModeSelect?.getAttribute("name")).toBe("gameModeSelect");
        expect(gameModeSelect?.getAttribute("id")).toBe("gameModeSelect");
      });

      test("it should have an easy mode option", () => {
        const body = document.querySelector(".form-group");
        const gameModeSelect = body?.children[1];
        const gameModeEasyOption = gameModeSelect?.children[0];

        expect(gameModeEasyOption).not.toBeNull();
        expect(gameModeEasyOption instanceof HTMLOptionElement).toBe(true);
        expect(gameModeEasyOption?.textContent).toContain("Easy");
        expect(gameModeEasyOption?.getAttribute("name")).toBe("easy");
        expect(gameModeEasyOption?.getAttribute("id")).toBe("easy-mode-btn");
      });

      test("it should have a medium mode option", () => {
        const body = document.querySelector(".form-group");
        const gameModeSelect = body?.children[1];
        const gameModeMediumOption = gameModeSelect?.children[1];

        expect(gameModeMediumOption).not.toBeNull();
        expect(gameModeMediumOption instanceof HTMLOptionElement).toBe(true);
        expect(gameModeMediumOption?.textContent).toContain("Medium");
        expect(gameModeMediumOption?.getAttribute("name")).toBe("medium");
        expect(gameModeMediumOption?.getAttribute("id")).toBe("medium-mode-btn");
      });

      test("it should have a hard mode option", () => {
        const body = document.querySelector(".form-group");
        const gameModeSelect = body?.children[1];
        const gameModeHardOption = gameModeSelect?.children[2];

        expect(gameModeHardOption).not.toBeNull();
        expect(gameModeHardOption instanceof HTMLOptionElement).toBe(true);
        expect(gameModeHardOption?.textContent).toContain("Hard");
        expect(gameModeHardOption?.getAttribute("name")).toBe("hard");
        expect(gameModeHardOption?.getAttribute("id")).toBe("hard-mode-btn");
      });

      test("it should have a very hard mode option", () => {
        const body = document.querySelector(".form-group");
        const gameModeSelect = body?.children[1];
        const gameModeVeryHardOption = gameModeSelect?.children[3];

        expect(gameModeVeryHardOption).not.toBeNull();
        expect(gameModeVeryHardOption instanceof HTMLOptionElement).toBe(true);
        expect(gameModeVeryHardOption?.textContent).toContain("Very Hard");
        expect(gameModeVeryHardOption?.getAttribute("name")).toBe("veryHard");
        expect(gameModeVeryHardOption?.getAttribute("id")).toBe("veryHard-mode-btn");
      });

      test("it should have a marathon mode option", () => {
        const body = document.querySelector(".form-group");
        const gameModeSelect = body?.children[1];
        const gameModeMarathonOption = gameModeSelect?.children[4];

        expect(gameModeMarathonOption).not.toBeNull();
        expect(gameModeMarathonOption instanceof HTMLOptionElement).toBe(true);
        expect(gameModeMarathonOption?.textContent).toContain("Marathon");
        expect(gameModeMarathonOption?.getAttribute("name")).toBe("marathon");
        expect(gameModeMarathonOption?.getAttribute("id")).toBe("marathon-mode-btn");
      });
    });

    describe("ball color select", () => {

      test("it should render correctly", () => {
        const ballColorSelect = document.getElementById("ballColorSelect");

        expect(ballColorSelect).not.toBeNull();
        expect(ballColorSelect instanceof HTMLSelectElement).toBe(true);
        expect(ballColorSelect?.getAttribute("name")).toBe("ballColorSelect");
        expect(ballColorSelect?.getAttribute("id")).toBe("ballColorSelect");
      });

      test("it should have a white color option", () => {
        const ballColorSelect = document.getElementById("ballColorSelect");
        const ballColorWhiteOption = ballColorSelect?.children[0];

        expect(ballColorWhiteOption).not.toBeNull();
        expect(ballColorWhiteOption instanceof HTMLOptionElement).toBe(true);
        expect(ballColorWhiteOption?.textContent).toBe("White");
        expect(ballColorWhiteOption?.getAttribute("name")).toBe("White");
        expect(ballColorWhiteOption?.getAttribute("id")).toBe("ball-color-white-btn");
      });

      test("it should have a red color option", () => {
        const ballColorSelect = document.getElementById("ballColorSelect");
        const ballColorRedOption = ballColorSelect?.children[1];

        expect(ballColorRedOption).not.toBeNull();
        expect(ballColorRedOption instanceof HTMLOptionElement).toBe(true);
        expect(ballColorRedOption?.textContent).toBe("Red");
        expect(ballColorRedOption?.getAttribute("name")).toBe("Red");
        expect(ballColorRedOption?.getAttribute("id")).toBe("ball-color-red-btn");
      });

      test("it should have a blue color option", () => {
        const ballColorSelect = document.getElementById("ballColorSelect");
        const ballColorBlueOption = ballColorSelect?.children[2];

        expect(ballColorBlueOption).not.toBeNull();
        expect(ballColorBlueOption instanceof HTMLOptionElement).toBe(true);
        expect(ballColorBlueOption?.textContent).toBe("Blue");
        expect(ballColorBlueOption?.getAttribute("name")).toBe("Blue");
        expect(ballColorBlueOption?.getAttribute("id")).toBe("ball-color-blue-btn");
      });
    });
  });

  describe("controls modal", () => {

    test("it should have header and body", () => {
      const controlsModal = document.querySelector("#controlsModal");
      const controlsTable = document.querySelector(".table");
      const controlsTableHeader = controlsTable?.children[0];
      const controlsTableColOne = controlsTableHeader?.children[0].children[0];
      const controlsTableColTwo = controlsTableHeader?.children[0].children[1];

      expect(controlsModal).not.toBeNull();
      expect(controlsTable).not.toBeNull();
      expect(controlsTableColOne).not.toBeNull();
      expect(controlsTableColOne instanceof HTMLTableCellElement).toBe(true);
      expect(controlsTableColOne?.textContent).toContain("Key");

      expect(controlsTableColTwo).not.toBeNull();
      expect(controlsTableColTwo instanceof HTMLTableCellElement).toBe(true);
      expect(controlsTableColTwo?.textContent).toContain("Description");
    });

    test("it should have pause section", () => {
      const controlsTable = document.querySelector(".table");
      const controlsTableBody = controlsTable?.children[1];
      const pauseHeader = controlsTableBody?.children[0].children[0];
      const pauseDescription = controlsTableBody?.children[0].children[1];

      expect(controlsTableBody).not.toBeNull();
      expect(pauseHeader).not.toBeNull();
      expect(pauseHeader?.textContent).toBe("P");
      expect(pauseDescription).not.toBeNull();
      expect(pauseDescription?.textContent).toBe("Pause the action");
    });

    test("it should have a quit section", () => {
      const controlsTable = document.querySelector(".table");
      const controlsTableBody = controlsTable?.children[1];
      const quitHeader = controlsTableBody?.children[1].children[0];
      const quitDescription = controlsTableBody?.children[1].children[1];

      expect(quitHeader).not.toBeNull();
      expect(quitHeader?.textContent).toBe("Q");
      expect(quitDescription).not.toBeNull();
      expect(quitDescription?.textContent).toBe("Quit or Reset");
    });

    test("it should have left arrow section", () => {
      const controlsTable = document.querySelector(".table");
      const controlsTableBody = controlsTable?.children[1];
      const leftArrowDescription = controlsTableBody?.children[2].children[1];

      expect(leftArrowDescription).not.toBeNull();
      expect(leftArrowDescription?.textContent).toBe("Move paddle left with back arrow");
    });

    test("it should have right arrow section", () => {
      const controlsTable = document.querySelector(".table");
      const controlsTableBody = controlsTable?.children[1];

      const rightArrowDescription = controlsTableBody?.children[3].children[1];
      expect(rightArrowDescription).not.toBeNull();
      expect(rightArrowDescription?.textContent).toBe(
        "Move paddle right with right arrow"
      );
    });

    test("it should have mouse controls section", () => {
      const controlsTable = document.querySelector(".table");
      const controlsTableBody = controlsTable?.children[1];
      const mouseMoveDescription = controlsTableBody?.children[4].children[1];

      expect(mouseMoveDescription).not.toBeNull();
      expect(
        mouseMoveDescription?.textContent
      ).toContain("Move paddle left and right with mouse");
    });
  });

  describe("tool bar", () => {

    test("it should have a play btn", () => {
      const toolBar = document.querySelector(".btn-toolbar");
      expect(toolBar).not.toBeNull();
      expect(toolBar?.getAttribute("role")).toBe("toolbar");

      const playBtn = toolBar?.children[0];

      expect(playBtn).not.toBeNull();
      expect(playBtn instanceof HTMLButtonElement).toBe(true);
      expect(playBtn?.textContent).toContain("Play");
      expect(playBtn?.getAttribute("type")).toBe("button");
    });

    test("it should have a pause btn", () => {
      const toolBar = document.querySelector(".btn-toolbar");
      const pauseBtn = toolBar?.children[1];

      expect(pauseBtn).not.toBeNull();
      expect(pauseBtn instanceof HTMLButtonElement).toBe(true);
      expect(pauseBtn?.textContent).toContain("Pause");
      expect(pauseBtn?.getAttribute("type")).toBe("button");
    });

    test("it should have a reset btn", () => {
      const toolBar = document.querySelector(".btn-toolbar");
      const resetBtn = toolBar?.children[2];

      expect(resetBtn).not.toBeNull();
      expect(resetBtn instanceof HTMLButtonElement).toBe(true);
      expect(resetBtn?.textContent).toContain("Reset");
      expect(resetBtn?.getAttribute("type")).toBe("button");
    });
  });

  test("it should have a canvas", () => {
    const canvas = document.getElementsByTagName("canvas")[0];

    expect(canvas).not.toBeNull();
    expect(canvas.getAttribute("id")).toBe("myCanvas");
    expect(canvas.getAttribute("width")).toBe("900");
    expect(canvas.getAttribute("height")).toBe("550");
  });

  test("it should have a table to show user scores", () => {
    const table = document.getElementById("scoreBoard");
    const tableHead = table?.children[0];
    const tableBody = table?.children[1];

    // table headers
    expect(table).not.toBeNull();
    expect(tableHead).not.toBeNull();

    const attemptsHead = tableHead?.children[0].children[0];
    expect(attemptsHead).not.toBeNull();
    expect(attemptsHead?.textContent).toBe("Attempts");

    const scoreHead = tableHead?.children[0].children[1];
    expect(scoreHead).not.toBeNull();
    expect(scoreHead?.textContent).toBe("Score");

    const modeHead = tableHead?.children[0].children[2];
    expect(modeHead).not.toBeNull();
    expect(modeHead?.textContent).toBe("Mode");

    const timestampHead = tableHead?.children[0].children[3];
    expect(timestampHead).not.toBeNull();
    expect(timestampHead?.textContent).toBe("Timestamp");

    // example entry
    expect(tableBody).not.toBeNull();
    expect(tableBody?.children[0].children[0]).not.toBeNull();
    expect(tableBody?.children[0].children[0].textContent).toBe("0");
    expect(tableBody?.children[0].children[1]).not.toBeNull();
    expect(tableBody?.children[0].children[1].textContent).toBe(
      "Your score"
    );
    expect(tableBody?.children[0].children[2]).not.toBeNull();
    expect(tableBody?.children[0].children[2].textContent).toBe(
      "Mode you played"
    );
    expect(tableBody?.children[0].children[3]).not.toBeNull();
    expect(tableBody?.children[0].children[3].textContent).toBe(
      "When you played"
    );
  });
});

/**
 * 검색(메인) 페이지로 접근한 후,
 * 영화 제목을 'frozen'으로, 표시 개수를 30개로 입력하고,
 * 'Apply' 버튼을 클릭해 영화 목록을 검색합니다.
 * 영화 목록 30개가 잘 출력됩니다.
 * 영화 목록에서 'Frozen II'(겨울왕국2) 영화 아이템을 클릭하면,
 * 영화 상세 정보 페이지로 이동합니다.
 * 상세 정보 페이지에서 정보를 확인할 수 있습니다.
 */

describe("movie search(frozen ii) ", () => {
  it("검색 페이지로 접근합니다", () => {
    cy.visit("/");
    cy.get("header .nav-link.active").contains("Search");
  });
  it("영화를 검색합니다", () => {
    // 영화 제목 입력!
    cy.get("input.form-control").type("frozen");
    // 검색할 최대 개수 입력!
    cy.get("select.form-select:nth-child(2)").select("10");
    // Apply 버튼 클릭!(검색 시작)
    cy.get("button.btn").contains("Apply").click();
    // 검색 완료 기다리기!
    cy.wait(2000);
    // 검색된 영화 아이템 개수를 확인!
    cy.get(".movie").should("have.length", 30);
  });
  it("겨울왕국2 영화 아이템을 선택합니다,", () => {
    // 1번째(Zero-based) 영화 아이템을 클릭!
    cy.get(".movie .title")
      // .find('.title')
      .contains("Frozen II")
      .click();
  });
});

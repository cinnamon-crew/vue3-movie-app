import { shallowMount } from "@vue/test-utils";
import router from "~/routes";
import store from "~/store";
import Header from "~/components/Header.vue";

describe("components/Header.vue", () => {
  test("경로 정규표현식이 일치하지 않습니다.", () => {
    const wrapper = shallowMount(Header, {
      global: {
        plugins: [router, store],
      },
    });
    const regExp = undefined;
    expect(wrapper.vm.isMatch(regExp)).toBe(123);
  });
});

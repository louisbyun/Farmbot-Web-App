import * as React from "react";
import { mount } from "enzyme";
import { Encoders } from "../encoders";
import { EncodersProps } from "../../interfaces";
import { panelState } from "../../../../__test_support__/control_panel_state";
import { bot } from "../../../../__test_support__/fake_state/bot";
import { BooleanMCUInputGroup } from "../../boolean_mcu_input_group";

describe("<Encoders />", () => {
  const fakeProps = (): EncodersProps => ({
    dispatch: jest.fn(),
    controlPanelState: panelState(),
    sourceFwConfig: x =>
      ({ value: bot.hardware.mcu_params[x], consistent: true }),
    firmwareHardware: undefined,
    shouldDisplay: () => true,
    arduinoBusy: false,
  });

  it("shows encoder labels", () => {
    const p = fakeProps();
    p.firmwareHardware = undefined;
    const wrapper = mount(<Encoders {...p} />);
    expect(wrapper.text().toLowerCase()).toContain("encoder");
    expect(wrapper.text().toLowerCase()).not.toContain("stall");
  });

  it("shows stall labels", () => {
    const p = fakeProps();
    p.firmwareHardware = "express_k10";
    const wrapper = mount(<Encoders {...p} />);
    expect(wrapper.text().toLowerCase()).not.toContain("encoder");
    expect(wrapper.text().toLowerCase()).toContain("stall");
  });

  it("disables stall detection toggles", () => {
    const p = fakeProps();
    p.shouldDisplay = () => false;
    p.controlPanelState.encoders = true;
    p.firmwareHardware = "express_k10";
    const wrapper = mount(<Encoders {...p} />);
    expect(wrapper.find(BooleanMCUInputGroup).first().props().disabled)
      .toEqual(true);
    expect(wrapper.text().toLowerCase()).not.toContain("sensitivity");
  });

  it("doesn't disable stall detection toggles: different firmware", () => {
    const p = fakeProps();
    p.shouldDisplay = () => false;
    p.controlPanelState.encoders = true;
    p.firmwareHardware = "arduino";
    const wrapper = mount(<Encoders {...p} />);
    expect(wrapper.find(BooleanMCUInputGroup).first().props().disabled)
      .toEqual(false);
  });

  it("doesn't disable stall detection toggles: not disabled", () => {
    const p = fakeProps();
    p.shouldDisplay = () => true;
    p.controlPanelState.encoders = true;
    p.firmwareHardware = "express_k10";
    const wrapper = mount(<Encoders {...p} />);
    expect(wrapper.find(BooleanMCUInputGroup).first().props().disabled)
      .toEqual(false);
    expect(wrapper.text().toLowerCase()).toContain("sensitivity");
  });
});

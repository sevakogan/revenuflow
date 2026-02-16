import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "@/components/ui/Select";

const options = [
  { value: "a", label: "Option A" },
  { value: "b", label: "Option B" },
  { value: "c", label: "Option C" },
];

describe("Select", () => {
  it("renders all options", () => {
    render(<Select options={options} />);
    const select = screen.getByRole("combobox");
    expect(select.querySelectorAll("option")).toHaveLength(3);
  });

  it("renders placeholder option when placeholder is given", () => {
    render(<Select options={options} placeholder="Select one" />);
    const select = screen.getByRole("combobox");
    // placeholder + 3 options = 4
    expect(select.querySelectorAll("option")).toHaveLength(4);
    expect(screen.getByText("Select one")).toBeInTheDocument();
  });

  it("renders label when label prop is given", () => {
    render(<Select options={options} label="Choose" />);
    expect(screen.getByText("Choose")).toBeInTheDocument();
  });

  it("renders error message when error prop is given", () => {
    render(<Select options={options} error="Required field" />);
    expect(screen.getByText("Required field")).toBeInTheDocument();
  });

  it("applies error styling when error prop is present", () => {
    render(<Select options={options} error="Required" />);
    const select = screen.getByRole("combobox");
    expect(select.className).toContain("border-red-500");
  });

  it("fires onChange when option is selected", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Select options={options} onChange={handleChange} />);
    await user.selectOptions(screen.getByRole("combobox"), "b");
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders controlled value", () => {
    render(<Select options={options} value="b" onChange={() => {}} />);
    expect(screen.getByRole("combobox")).toHaveValue("b");
  });
});

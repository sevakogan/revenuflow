import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "@/components/ui/Input";

describe("Input", () => {
  it("renders without label when label is not provided", () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument();
    expect(screen.queryByText(/./)).toBeNull(); // no label text
  });

  it("renders label text when label prop is given", () => {
    render(<Input label="Email" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("renders error message when error prop is given", () => {
    render(<Input error="Email is required" />);
    expect(screen.getByText("Email is required")).toBeInTheDocument();
  });

  it("applies error styling when error prop is present", () => {
    render(<Input error="Required" />);
    const input = screen.getByRole("textbox");
    expect(input.className).toContain("border-red-500");
  });

  it("forwards placeholder prop", () => {
    render(<Input placeholder="john@example.com" />);
    expect(screen.getByPlaceholderText("john@example.com")).toBeInTheDocument();
  });

  it("forwards type prop", () => {
    render(<Input type="email" placeholder="email" />);
    const input = screen.getByPlaceholderText("email");
    expect(input).toHaveAttribute("type", "email");
  });

  it("forwards onChange handler", async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="type here" />);
    await user.type(screen.getByPlaceholderText("type here"), "hello");
    expect(handleChange).toHaveBeenCalled();
  });

  it("renders value when controlled", () => {
    render(<Input value="test value" onChange={() => {}} placeholder="input" />);
    expect(screen.getByPlaceholderText("input")).toHaveValue("test value");
  });
});

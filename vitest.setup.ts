import "@testing-library/jest-dom/vitest";
import { installDialog } from "@/test/dialog";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

beforeEach(installDialog);

afterEach(cleanup);

import "@testing-library/jest-dom/vitest";
import { installDialog } from "@/test/dialog";
import { installMatchMedia } from "@/test/match-media";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

beforeEach(installDialog);
beforeEach(installMatchMedia);

afterEach(cleanup);

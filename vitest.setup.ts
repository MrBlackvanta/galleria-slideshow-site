import "@testing-library/jest-dom/vitest";
import { installDialog } from "@/test/dialog";
import { installImageDecode } from "@/test/image";
import { installMatchMedia } from "@/test/media";
import { cleanup } from "@testing-library/react";
import { afterEach, beforeEach } from "vitest";

beforeEach(installDialog);
beforeEach(installImageDecode);
beforeEach(() => installMatchMedia());

afterEach(cleanup);

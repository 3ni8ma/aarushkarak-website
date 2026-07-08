export interface Theme {
  id: string;
  label: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export const themes: Theme[] = [
  {
    id: "magma",
    label: "Magma",
    colors: {
      primary: "194 164 255",
      secondary: "168 124 255",
      accent: "34 211 238",
    },
  },
  {
    id: "forest",
    label: "Forest",
    colors: {
      primary: "52 211 153",
      secondary: "5 150 105",
      accent: "110 231 183",
    },
  },
  {
    id: "ocean",
    label: "Ocean",
    colors: {
      primary: "96 165 250",
      secondary: "59 130 246",
      accent: "147 197 253",
    },
  },
  {
    id: "sunset",
    label: "Sunset",
    colors: {
      primary: "251 146 60",
      secondary: "244 114 182",
      accent: "253 186 116",
    },
  },
  {
    id: "midnight",
    label: "Midnight",
    colors: {
      primary: "167 139 250",
      secondary: "129 140 248",
      accent: "196 181 253",
    },
  },
];

# Portfolio CLI

Sethy Rung's terminal portfolio: a Dev Card by default, other Screens on demand.

## Language

**Dev Card**:
The default Screen shown when the CLI is invoked with no arguments: identity, Tagline, links, and Hint.
_Avoid_: business card, home, landing

**Screen**:
A named portfolio view selected by argument and rendered in the terminal.
_Avoid_: page, view, TUI, pane, card

**Tagline**:
The one-line who-I-am on the Dev Card. Distinct from About.
_Avoid_: about, bio, headline, subtitle

**Hint**:
The command map under the Dev Card: Screen commands plus the Role and Project titles a visitor can open. Not `--help` and not the full Screens.
_Avoid_: menu, footer, help

**About**:
The bio Screen. Owns the full bio; the Dev Card does not. Not education or certs.
_Avoid_: bio, profile, education

**Work**:
The employment-history Screen.
_Avoid_: experience, jobs, career

**Projects**:
The Screen listing shipped Projects.
_Avoid_: portfolio, work (that's a different Screen)

**Project**:
A shipped piece of work listed on Projects and openable on its own.
_Avoid_: repo, app, case study

**Role**:
One employment period on Work, openable on its own.
_Avoid_: job, position, stint, experience

**Period**:
The date range of a Role or Project.
_Avoid_: dates, duration, tenure

**Stack**:
The technologies on a Role or Project. Not a category label.
_Avoid_: tag, tags, tech, tools

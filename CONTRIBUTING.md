# Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners(members) of this repository before making a change.

## Pull Request Process

**can skip about step 1,2.** 

step 1. add issue about suggestion or refactor.

step 2. discussion about issue if it will progress or not.   

or

step 1. add comment existed issue that you want progress.

step 2. agree at owner(or members) about can progress.

**using this process is that prevent duplication work.**
 
step 3. add or edit code checkout branch from `develop` branch
step 4. add PR(Pull Request)
step 5. reviewed PR
step 6. merged PR to `develop`
 
## Issue
Our Project develop using [Issue](https://github.com/ahki/oh-my-desk/issues). 
Issue manage will change thing, will add feature, feature suggestion, question about this project etc.

Current, manage issue using tag.
kind of tag is following.
 
- planing tag(todo, pending)
	- `pending`: issue about roadmap. need to plan and design
	- `todo`: issue that will progress plan and design.
- discussion tag(suggestion, question)
	- `suggestion`: someone suggest refactor thing or add feature. Will change `todo` or `closed` after discussion with owner(or member).
	- `question`: someone question about this project.    
- will progress tag(bug, enhancement)
	- `bug`: will progress that fix about bug. anyone can progress this issue. leave comment!
	- `enhancement`: will progress refactor thing. anyone can progress this issue. leave comment!
- progressing tag (todo)
	-`doing`: someone progress this issue. 
- complete tag (release ready, release)
	- `release ready`: this issue is completed and waitted release. Generally PR about this issue is merged in `develop` branch.
	- `release`: this issue is completed and released.

## Branch Organization

main branch is `master`. when released, code is merged in `matser` branch.

When develop about this project, We use `develop` branch. If you write code and add PR then complete, It will merge `develop` branch. when release, `develop` branch is taged version then merged to `master` branch.

Generally, Every branch is checked out from `develop`. It is not mandatory. Because `develop` branch may be unstable so you can check out branch from `master`. 

if you make branch and add PR, generally it is merged `develop` branch. 

## Semantic Versioning
we use [SemVer](https://semver.org/) for versioning.

Given a version number MAJOR.MINOR.PATCH, increment the:

1. MAJOR version when you make incompatible API changes,
2. MINOR version when you add functionality in a backwards-compatible manner.
3. PATCH version when you make backwards-compatible bug fixes.

## CLA

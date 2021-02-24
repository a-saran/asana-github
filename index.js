const core = require("@actions/core");
const github = require("@actions/github");
const asana = require("asana");

// get project
// create section - optional
// create task

async function asanaOperations(asanaPAT, targets) {
  try {
    console.log("function called");
    const client = asana.Client.create({
      defaultHeaders: { "asana-enable": "new-sections,string_ids" },
      logAsanaChangeWarnings: false
    }).useAccessToken(asanaPAT);

    // Get All project
    const projects = client.projects
      .getProjects({ param: "value", param: "value", opt_pretty: true })
      .then(result => {
        console.log(result, "projects");
        return result;
      });

    targets.forEach(async target => {
      // Get project
      const targetProject = projects.find(
        project => project.name.toLowerCase() === target.project.toLowerCase()
      );
      console.log({ targetProject });
      // if(targetProject) {

      // }
    });

    client.tasks.createTask({ completed: false, pretty: true }).then(result => {
      console.log("create Task result", result);
    });

    // // targets.forEach(async target => {
    // let targetProject = task.projects.find(
    //   project => project.name === target.project
    // );
    // if (targetProject) {
    //   let targetSection = await client.sections
    //     .findByProject(targetProject.gid)
    //     .then(sections =>
    //       sections.find(section => section.name === target.section)
    //     );
    //   if (targetSection) {
    //     await client.sections.addTask(targetSection.gid, { task: taskId });
    //     core.info(`Moved to: ${target.project}/${target.section}`);
    //   } else {
    //     core.error(`Asana section ${target.section} not found.`);
    //   }
    // } else {
    //   core.info(`This task does not exist in "${target.project}" project`);
    // }
    // });

    // if (taskComment) {
    //   await client.addTask();
    //   await client.tasks.addComment(taskId, {
    //     text: taskComment
    //   });
    //   core.info("Added the pull request link to the Asana task.");
    // }
  } catch (ex) {
    console.error(ex.value);
  }
}

try {
  console.log("try method");
  const ASANA_TOKEN = core.getInput("asana-pat"),
    TARGETS = core.getInput("targets");
  // PULL_REQUEST = github.context.payload.pull_request,
  // REGEX = new RegExp(
  //   `${TRIGGER_PHRASE} *\\[(.*?)\\]\\(https:\\/\\/app.asana.com\\/(\\d+)\\/(?<project>\\d+)\\/(?<task>\\d+).*?\\)`,
  //   "g"
  // );

  let targets = TARGETS ? JSON.parse(TARGETS) : [];
  // parseAsanaURL = null;

  if (!ASANA_TOKEN) {
    throw { message: "ASANA PAT Not Found!" };
  }
  // if (TASK_COMMENT) {
  //   taskComment = `${TASK_COMMENT} ${PULL_REQUEST.html_url}`;
  // }
  asanaOperations(ASANA_TOKEN, targets);
  // while ((parseAsanaURL = REGEX.exec(PULL_REQUEST.body)) !== null) {
  //   let taskId = parseAsanaURL.groups.task;
  //   if (taskId) {
  //     asanaOperations(ASANA_TOKEN, targets);
  //   } else {
  //     core.info(
  //       `Invalid Asana task URL after the trigger phrase ${TRIGGER_PHRASE}`
  //     );
  //   }
  // }
} catch (error) {
  core.error(error.message);
}

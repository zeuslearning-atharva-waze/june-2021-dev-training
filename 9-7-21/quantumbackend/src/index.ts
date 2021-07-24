import cors from "cors";
import express from "express";
import { appPORT } from "./config";
import UserRoutes from "./routes/User";
import WalkinRoutes from "./routes/Walkin";

const PORT = appPORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const walkinRoutes = new WalkinRoutes();
const userRoutes = new UserRoutes();

app.listen(PORT, () => {
  console.log("app listening on port", PORT);
});

// walkin routes
app.use("/walkins", walkinRoutes.getWalkinRoute);
app.use("/walkin", walkinRoutes.getWalkinByIdRoute);
app.use("/walkin/apply", walkinRoutes.WalkinApply);

//user routes
app.use("/user/login", userRoutes.userlogin);

// //api routes
// app.get("/", (req: Request, res: Response) => {
//   res.send("hello world");
// });

// app.get("/walkins", (req: Request, res: Response) => {
//   if (req) {
//     connection.query(
//       "call getWalkins('2021-07-1',30);",
//       function (err, result) {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   }
// });

// app.get("/walkin/:id", (req: Request, res: Response) => {
//   //console.log(req.params.id);

//   if (req) {
//     connection.query(
//       "call getWalkinDetails(?);",
//       [req.params.id],
//       function (err, result) {
//         if (err) throw err;
//         res.send(result);
//       }
//     );
//   }
// });

// app.post("/login", (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   if (!email || !password) {
//     return res.status(422).json({ error: "please add all fields!" });
//   }

//   connection.query(
//     "select user_id,password from user where email = ?;",
//     [email],
//     function (err, result) {
//       if (result) {
//         let fr = result[0];

//         argon2.verify(fr.password, password).then((match) => {
//           if (match) {
//             const token = jwt.sign({ id: fr.user_id }, JWT_SECRET);
//             res.send({ token, user: { id: fr.user_id } });
//           } else {
//             return res.status(422).send({ error: "Invalid credentials!" });
//           }
//         });
//       }
//     }
//   );
// });

// app.post("/apply", (req: Request, res: Response) => {
//   const { userid, guid, prefrences, slotid, resumelink } = req.body;

//   connection.query(
//     "SELECT walk_in_id FROM walk_in where GUID = ?;",
//     [guid],
//     (err, result) => {
//       let fr = result[0].walk_in_id;
//       connection.query(
//         "select user_id,walk_in_id from user_prefrence   where user_id = ? and walk_in_id = ?;",
//         [userid, fr],
//         (err, resultz) => {
//           if (resultz.length > 0) {
//             res.status(322).send({ message: "you have already registered" });
//           } else {
//             connection.query(
//               "call bookWalkin(?,?,?,?,?);",
//               [userid, guid, prefrences, slotid, resumelink],
//               function (err, result) {
//                 if (result) {
//                   res.status(200).send(result);
//                 } else {
//                   res.status(404).send(err);
//                 }
//               }
//             );
//           }
//         }
//       );
//     }
//   );
// });

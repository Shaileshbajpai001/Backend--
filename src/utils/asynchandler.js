const asyncHandler = (requestHandler)=>{
   return (req,res,next) => {
        Promise.resolve(requestHandler(req,res,next)).catch((err) => next(err))
    }
}


export {asyncHandler}

 





















/*

// +++++++++++ UTILITY BYTRYCATCH ++++++++++

                      //higher order function
                      // means want to pass function into another function
const asyncHandler = (fn)=> async (req,res,next) =>{
try {
    await fn(req,res,next)
} catch (error) {
    res.status(error.code || 500).json({
        success:false,                  /// also want to understand json response
        message :error.message
    })

}

}

*/
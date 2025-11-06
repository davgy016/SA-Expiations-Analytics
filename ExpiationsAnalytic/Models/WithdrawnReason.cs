using System;
using System.Collections.Generic;

namespace ExpiationsAnalytic.Models;

public partial class WithdrawnReason
{
    public string WithdrawCode { get; set; } = null!;

    public string WithdrawReason { get; set; } = null!;
}
